import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";

// Configure the auth handler with explicit options
export const GET = handleAuth({
  clientId: process.env.NEXT_PUBLIC_KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  issuer: process.env.NEXT_PUBLIC_KINDE_ISSUER_URL,
  redirectUri: process.env.NEXT_PUBLIC_KINDE_REDIRECT_URL,
  logoutUri: process.env.NEXT_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL,
});