"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedisEnabled = isRedisEnabled;
const FALSE_VALUES = new Set(['0', 'false', 'no', 'off']);
function isRedisEnabled() {
    const value = process.env.ENABLE_REDIS ?? process.env.REDIS_ENABLED;
    if (!value)
        return true;
    return !FALSE_VALUES.has(value.trim().toLowerCase());
}
//# sourceMappingURL=runtime-flags.js.map