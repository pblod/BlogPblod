import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { authConfig } from "@/lib/kinde";
import { NextRequest } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: string } }
) {
  return handleAuth({
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    issuer: authConfig.issuerUrl,
    redirectUri: authConfig.redirectUrl,
    logoutUri: authConfig.logoutUrl,
  })(request, { params });
}