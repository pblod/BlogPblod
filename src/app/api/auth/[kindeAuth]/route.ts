import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { authConfig } from "@/lib/kinde";

// Configure the auth handler with explicit options
export const GET = handleAuth({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  issuer: authConfig.issuerUrl,
  redirectUri: authConfig.redirectUrl,
  logoutUri: authConfig.logoutUrl,
});