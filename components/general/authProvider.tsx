"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { authConfig } from "@/lib/kinde";

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <KindeProvider
      clientId={authConfig.clientId}
      domain={authConfig.issuerUrl}
      redirectUri={authConfig.redirectUrl}
      logoutUri={authConfig.logoutUrl}
    >
      {children}
    </KindeProvider>
  );
};