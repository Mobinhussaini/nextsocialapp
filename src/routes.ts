/**
 * An array of public routes
 * @type {string[]}
 */

export const publicRoutes = ["/public"];

/**
 * An array authentication routes
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/new-verification",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/two-factor-code"
];
 
export const profileRoutes = [
  "/",
  "/dashboard",
  "/profile",
  "/profile/[username]",
]

/**
 * An array of API routes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
