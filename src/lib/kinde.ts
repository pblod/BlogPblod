export const authConfig = {
    clientId: process.env.KINDE_CLIENT_ID,
    clientSecret: process.env.KINDE_CLIENT_SECRET,
    issuerUrl: process.env.KINDE_ISSUER_URL,
    redirectUrl: process.env.KINDE_REDIRECT_URL || `${process.env.VERCEL_URL}/api/auth/callback`,
    logoutUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL || process.env.VERCEL_URL,
}

if (!authConfig.clientId || !authConfig.clientSecret || !authConfig.issuerUrl) {
    throw new Error('Missing required Kinde environment variables');
} 