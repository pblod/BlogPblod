import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { authConfig } from "@/lib/kinde";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { kindeAuth: string } }) {
  if (!process.env.KINDE_CLIENT_ID || !process.env.KINDE_CLIENT_SECRET || !process.env.KINDE_ISSUER_URL) {
    return new NextResponse('Kinde configuration missing', { status: 500 });
  }
  
  const handler = handleAuth({
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    issuer: authConfig.issuerUrl,
    redirectUri: authConfig.redirectUrl,
    logoutUri: authConfig.logoutUrl,
  });
  
  return handler(request, context);
}