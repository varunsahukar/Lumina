"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import {
  AccentSquare,
  AgencyLogo,
  AgencyServiceCard,
  PixelIcon,
} from "@/components/agency/AgencyPrimitives";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AuthMode = "login" | "register";
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AgencyAuthExperience({ initialMode }: { initialMode: AuthMode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [activeMode, setActiveMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Invalid email or password. Please try again.",
        });
      } else {
        toast({
          title: "Welcome back",
          description: "Your dashboard is ready.",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection error",
        description: "Failed to connect to the authentication server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.message || "An error occurred during sign up.",
        });
      } else {
        toast({
          title: "Account created",
          description: "Sign in with your new credentials.",
        });
        setActiveMode("login");
        loginForm.setValue("email", data.email);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "Could not complete account creation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass =
    "agency-input pl-10 text-lg font-semibold placeholder:text-[#9d9793] focus:border-[#c95545]";

  return (
    <div className="agency-page min-h-screen overflow-hidden">
      <span className="agency-scroll-rail hidden lg:block" />
      <header className="agency-container flex h-24 items-center justify-between">
        <AgencyLogo />
        <nav className="hidden items-center gap-9 text-sm font-semibold uppercase tracking-[0.18em] text-[#4c4846] md:flex">
          <Link className="border-b-2 border-black pb-2" href="/">
            Home
          </Link>
          <Link className="border-b-2 border-black pb-2" href="/screener">
            Services
          </Link>
          <Link className="border-b-2 border-black pb-2" href="/dashboard">
            Dashboard
          </Link>
        </nav>
        <Link href={activeMode === "login" ? "/register" : "/login"} className="agency-button">
          {activeMode === "login" ? "Sign Up" : "Sign In"}
        </Link>
      </header>

      <main className="agency-container grid min-h-[calc(100vh-6rem)] gap-14 py-10 lg:grid-cols-[0.95fr_0.78fr] lg:items-center">
        <section className="relative">
          <p className="agency-label mb-8">Secure capital access</p>
          <h1 className="agency-pixel max-w-3xl text-[4.5rem] text-[#c95545] sm:text-[6.6rem]">
            {activeMode === "login" ? "Welcome back to the console" : "Create your investor console"}
          </h1>
          <p className="mt-8 max-w-2xl text-2xl font-semibold leading-[1.35] text-[#3f3a37]">
            Direct plans, watchlists, risk diagnostics and portfolio decisions live in one hard-edged
            workspace built for repeat action.
          </p>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-5">
            <AgencyServiceCard
              title="Security"
              tone="cream"
              number="01"
              icon="brand"
              className="min-h-[220px]"
            />
            <AgencyServiceCard
              title="Screening"
              tone="red"
              number="02"
              icon="web"
              className="min-h-[220px]"
            />
            <AgencyServiceCard
              title="Dashboard"
              tone="blue"
              number="03"
              icon="desktop"
              className="min-h-[220px]"
            />
          </div>
          <AccentSquare className="absolute right-10 top-20" />
        </section>

        <section className="agency-hard-shadow border-[3px] border-black bg-[#f7eee8]">
          <div className="grid grid-cols-2 border-b-[3px] border-black">
            {(["login", "register"] as AuthMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setActiveMode(mode)}
                className={`h-16 border-r-[3px] border-black text-sm font-bold uppercase tracking-[0.18em] last:border-r-0 ${
                  activeMode === mode ? "bg-[#c95545] text-[#f7eee8]" : "bg-[#f7eee8] text-black"
                }`}
              >
                {mode === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="p-7 sm:p-10">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="agency-label mb-3">{activeMode === "login" ? "Company name" : "New workspace"}</p>
                <h2 className="text-3xl font-bold text-black">
                  {activeMode === "login" ? "Access LuminaVest" : "Start LuminaVest"}
                </h2>
              </div>
              <div className="grid h-14 w-14 place-items-center border-[3px] border-black bg-[#4ba1a7]">
                {activeMode === "login" ? (
                  <ShieldCheck className="h-7 w-7 text-black" />
                ) : (
                  <PixelIcon kind="mobile" className="scale-75" />
                )}
              </div>
            </div>

            {activeMode === "login" ? (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-7">
                <Field
                  label="E-mail"
                  error={loginForm.formState.errors.email?.message}
                  icon={<Mail className="h-5 w-5" />}
                >
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    className={fieldClass}
                    {...loginForm.register("email")}
                  />
                </Field>

                <Field
                  label="Password"
                  error={loginForm.formState.errors.password?.message}
                  icon={<Lock className="h-5 w-5" />}
                >
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className={fieldClass}
                    {...loginForm.register("password")}
                  />
                </Field>

                <div className="flex items-center justify-between border-b border-[#d8cec7] pb-5 text-sm font-bold">
                  <label className="flex items-center gap-3">
                    <span className="h-4 w-4 border border-black" />
                    I accept the <span className="underline">Terms and Conditions</span>
                  </label>
                  <span className="text-xs uppercase tracking-[0.18em] text-[#9d9793]">Off</span>
                </div>

                <SubmitButton isLoading={isLoading}>Enter dashboard</SubmitButton>
              </form>
            ) : (
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-7">
                <Field
                  label="Company name"
                  error={registerForm.formState.errors.name?.message}
                  icon={<User className="h-5 w-5" />}
                >
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Your name"
                    className={fieldClass}
                    {...registerForm.register("name")}
                  />
                </Field>

                <Field
                  label="E-mail"
                  error={registerForm.formState.errors.email?.message}
                  icon={<Mail className="h-5 w-5" />}
                >
                  <input
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
                    className={fieldClass}
                    {...registerForm.register("email")}
                  />
                </Field>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    label="Password"
                    error={registerForm.formState.errors.password?.message}
                    icon={<Lock className="h-5 w-5" />}
                  >
                    <input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className={fieldClass}
                      {...registerForm.register("password")}
                    />
                  </Field>
                  <Field
                    label="Repeat"
                    error={registerForm.formState.errors.confirmPassword?.message}
                    icon={<Lock className="h-5 w-5" />}
                  >
                    <input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className={fieldClass}
                      {...registerForm.register("confirmPassword")}
                    />
                  </Field>
                </div>

                <SubmitButton isLoading={isLoading}>Create account</SubmitButton>
              </form>
            )}

            <button
              type="button"
              onClick={() => signIn("google")}
              className="mt-7 flex h-14 w-full items-center justify-center gap-3 border-[3px] border-black bg-[#0b0b0b] text-sm font-bold uppercase tracking-[0.1em] text-[#f7eee8] shadow-[7px_7px_0_#c95545]"
            >
              <span className="grid h-7 w-7 place-items-center bg-[#f7eee8] text-black">G</span>
              Connect with Google
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#69625e]">{label}</span>
      <span className="relative mt-1 block">
        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#c95545]">
          {icon}
        </span>
        {children}
      </span>
      {error && <span className="mt-2 block text-xs font-bold text-[#c95545]">{error}</span>}
    </label>
  );
}

function SubmitButton({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={isLoading} className="agency-button w-full">
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
      {!isLoading && <ArrowRight className="ml-3 h-5 w-5" />}
    </button>
  );
}
