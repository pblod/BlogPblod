import { getKindeServerConfig } from "@kinde-oss/kinde-auth-nextjs/server";

export const kindeConfig = getKindeServerConfig();

// Validate environment variables at startup
if (!process.env.KINDE_CLIENT_ID || !process.env.KINDE_CLIENT_SECRET || !process.env.KINDE_ISSUER_URL) {
    throw new Error(
        'Missing required environment variables for Kinde authentication. Please check your .env file and Vercel environment variables.'
    );
}

export const authConfig = {
    clientId: process.env.KINDE_CLIENT_ID,
    clientSecret: process.env.KINDE_CLIENT_SECRET,
    issuerUrl: process.env.KINDE_ISSUER_URL,
    redirectUrl: process.env.KINDE_REDIRECT_URL || `${process.env.VERCEL_URL}/api/auth/callback`,
    logoutUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL || process.env.VERCEL_URL,
}; 