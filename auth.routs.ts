/**
 * This contains all the public routes of the application
 * these routes do not require authentication
 * @type {string[]}
 * */
export const publicRoutes: string[] = [
    "/",
    "/new-verification",
]

/**
 * This file contains all the public routes of the application
 * these routes use for authentication
 * these routes redirect user to dashboard page after login
 * @type {string[]}
 * */

export const authRoutes: string[] = [
    "/sign-in",
    "/sign-up",
    "/error",
    "/reset",
    "/new-password",
]

/**
 * This prefix for authentication routes
 *  that are start with this prefix are used for API authentication
 * @type {string}
 * */
export const apiAuthPrefix: string = "/api/auth"

/**
 * default redirect path after login
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard"

