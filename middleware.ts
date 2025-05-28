import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    // Routes that require authentication
    callbacks: {
      authorized: ({ req }: { req: NextRequest }) => {
        return false; // This forces authentication for matched routes
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard"],
}; 