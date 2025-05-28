import { Button } from "@/components/ui/button";
import Link from "next/link";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavBar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-5xl font-semibold">
                        <span className="text-white">Blog</span><span className="text-green-500">Pblod</span>
                    </h1>
                </Link>
                <div className="hidden sm:flex items-center gap-6">
                    <Link href="/" className="nav-link">
                        Home
                    </Link>
                </div>
                <div className="hidden sm:flex items-center gap-6">
                    <Link href="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </div>
            </div>
            
            {user ? (
                <div className="flex items-center gap-6">
                    {user.email === "ben12tend@gmail.com" && (
                        <Link 
                            href="/dashboard/pendingPosts" 
                            className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition-colors"
                        >
                            <span className="mr-2">📝</span> Review Posts
                        </Link>
                    )}
                    <p className="text-white text-2xl font-medium">Welcome, {user.given_name}!</p>
                    <LogoutLink className="auth-button">
                        <span>Logout</span>
                    </LogoutLink>
                </div>
            ) : (
                <div className="flex items-center gap-6">
                    <LoginLink className="auth-button">
                        <span>Sign in</span>
                    </LoginLink>
                    <RegisterLink className="auth-button">
                        <span>Sign up</span>
                    </RegisterLink>
                </div>
            )}
        </nav>
    );
}