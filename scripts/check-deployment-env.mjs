#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const VALID_TARGETS = new Set(["all", "frontend", "backend"]);
const PLACEHOLDER_VALUES = [
  "replace_with_secure_secret",
  "your_key_here",
  "mock-signzy-token",
  "mock-finnhub-key",
  "default-secret-key",
];

const args = process.argv.slice(2);
const target = VALID_TARGETS.has(args[0]) ? args[0] : "all";
const stageArg = args.find((arg) => arg.startsWith("--stage="));
const stage = (
  stageArg?.split("=")[1] ||
  process.env.DEPLOY_ENV ||
  process.env.VERCEL_ENV ||
  process.env.NODE_ENV ||
  "development"
).toLowerCase();
const isProductionLike = ["production", "staging", "preview"].includes(stage);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const rootEnv = loadEnvFile(path.join(rootDir, ".env"));
const backendEnv = loadEnvFile(path.join(rootDir, "backend", ".env"));

const results = [];

if (target === "all" || target === "frontend") {
  results.push(
    validateService("frontend", { ...rootEnv, ...process.env }, [
      "BACKEND_API_URL",
      "NEXT_PUBLIC_BACKEND_API_URL",
      "DATABASE_URL",
      "JWT_SECRET",
    ]),
  );
}

if (target === "all" || target === "backend") {
  const env = { ...backendEnv, ...process.env };
  const required = [
    "DATABASE_URL",
    "JWT_SECRET",
    "MFAPI_BASE_URL",
    "AMFI_NAV_URL",
    "INDIA_SCHEME_CODES",
    "ALPHA_VANTAGE_KEY",
    "ALPHA_VANTAGE_BASE_URL",
    "USA_TICKERS",
    "ENABLE_REDIS",
  ];

  if (env.ENABLE_YAHOO_FINANCE === "true") {
    required.push("RAPIDAPI_KEY");
  }

  if (env.ENABLE_WEBSOCKET_PRICES === "true") {
    required.push("FINNHUB_API_KEY");
  }

  results.push(validateService("backend", env, required));
}

const errors = results.flatMap((result) => result.errors);
const warnings = results.flatMap((result) => result.warnings);

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exit(1);
}

console.log(
  `Deployment environment check passed for ${target} (${stage}).`,
);

function validateService(name, env, requiredKeys) {
  const errors = [];
  const warnings = [];

  for (const key of requiredKeys) {
    if (!hasRealValue(env[key])) {
      errors.push(`${name}: missing or placeholder value for ${key}`);
    }
  }

  if (name === "frontend") {
    validateUrl("frontend", "BACKEND_API_URL", env.BACKEND_API_URL, errors);
    validateUrl(
      "frontend",
      "NEXT_PUBLIC_BACKEND_API_URL",
      env.NEXT_PUBLIC_BACKEND_API_URL,
      errors,
    );

    if (isProductionLike) {
      rejectLocalUrl("frontend", "BACKEND_API_URL", env.BACKEND_API_URL, errors);
      rejectLocalUrl(
        "frontend",
        "NEXT_PUBLIC_BACKEND_API_URL",
        env.NEXT_PUBLIC_BACKEND_API_URL,
        errors,
      );

      if (!env.NEXT_PUBLIC_BACKEND_API_URL?.startsWith("https://")) {
        errors.push(
          "frontend: NEXT_PUBLIC_BACKEND_API_URL must use HTTPS in production/staging",
        );
      }
    }
  }

  if (name === "backend") {
    validateDatabaseUrl("backend", env, errors, warnings);

    if (isRedisEnabled(env)) {
      const hasRedisUrl = hasRealValue(env.REDIS_URL);
      const hasRedisHostPort =
        hasRealValue(env.REDIS_HOST) && hasRealValue(env.REDIS_PORT);

      if (!hasRedisUrl && !hasRedisHostPort) {
        errors.push(
          "backend: Redis is enabled, so set REDIS_URL or REDIS_HOST plus REDIS_PORT",
        );
      }

      if (isProductionLike) {
        if (hasRedisUrl) {
          rejectLocalUrl("backend", "REDIS_URL", env.REDIS_URL, errors);
        } else {
          rejectLocalHost("backend", "REDIS_HOST", env.REDIS_HOST, errors);
        }
      }
    } else if (isProductionLike) {
      warnings.push(
        "backend: ENABLE_REDIS=false disables cache and BullMQ sync jobs; use only if intentional",
      );
    }
  }

  return { errors, warnings };
}

function validateDatabaseUrl(name, env, errors, warnings) {
  const value = env.DATABASE_URL;
  if (!hasRealValue(value)) {
    return;
  }

  if (!value.startsWith("postgresql://") && !value.startsWith("postgres://")) {
    errors.push(`${name}: DATABASE_URL must be a PostgreSQL connection string`);
  }

  if (isProductionLike) {
    rejectLocalUrl(name, "DATABASE_URL", value, errors);

    const sslModeIsExplicit =
      value.includes("sslmode=") ||
      value.includes("ssl=true") ||
      env.DATABASE_URL_SSL_MODE_REQUIRED === "false";

    if (!sslModeIsExplicit) {
      warnings.push(
        `${name}: DATABASE_URL has no explicit SSL mode; add sslmode=verify-full or set DATABASE_URL_SSL_MODE_REQUIRED=false if the provider does not require it`,
      );
    }
  }
}

function validateUrl(service, key, value, errors) {
  if (!hasRealValue(value)) {
    return;
  }

  try {
    new URL(value);
  } catch {
    errors.push(`${service}: ${key} must be a valid URL`);
  }
}

function rejectLocalUrl(service, key, value, errors) {
  if (!hasRealValue(value)) {
    return;
  }

  try {
    const url = new URL(value);
    rejectLocalHost(service, key, url.hostname, errors);
  } catch {
    errors.push(`${service}: ${key} must be a valid URL`);
  }
}

function rejectLocalHost(service, key, value, errors) {
  if (!hasRealValue(value)) {
    return;
  }

  const host = value.toLowerCase();
  if (["localhost", "127.0.0.1", "::1", "0.0.0.0"].includes(host)) {
    errors.push(`${service}: ${key} cannot point to ${value} in ${stage}`);
  }
}

function isRedisEnabled(env) {
  const value = env.ENABLE_REDIS ?? env.REDIS_ENABLED;
  return value === undefined || value.toLowerCase() !== "false";
}

function hasRealValue(value) {
  if (value === undefined || value === null) {
    return false;
  }

  const trimmed = String(value).trim();
  return (
    trimmed.length > 0 &&
    !PLACEHOLDER_VALUES.some((placeholder) =>
      trimmed.toLowerCase().includes(placeholder.toLowerCase()),
    )
  );
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const result = {};
  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    result[key] = value;
  }

  return result;
}
