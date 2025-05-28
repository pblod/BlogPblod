import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { prisma } from "@/app/utils/db";
import { BlogPostCard } from "../../../components/general/blogPostCard";

async function getPosts(userID: string) {
    const posts = await prisma.blogpost.findMany({
        where: {
            authorId: userID,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return posts;
}

function PostStatusBadge({ status }: { status: string }) {
    const statusStyles = {
        pending: "bg-yellow-500 text-black",
        approved: "bg-green-500 text-black",
        rejected: "bg-red-500 text-white"
    };

    const statusText = {
        pending: "In Review",
        approved: "Published",
        rejected: "Rejected"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
            {statusText[status as keyof typeof statusText]}
        </span>
    );
}

export default async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getPosts(user?.id as string);

    if (!user) {
        redirect("/api/auth/login");
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
                Welcome to your Dashboard, {user.given_name}
            </h1>
            <div className="flex items-center mb-5">
                <Link href="/dashboard/create" className="auth-button">
                    <span>Create Blog</span>
                </Link>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <p className="text-white text-xl mb-4">
                    Your Posts Overview
                </p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="text-white">In Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-white">Published</span>
                    </div>
                </div>
            </div>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((post) => (
                    <div key={post.id} className="relative">
                        <div className="absolute top-4 right-4 z-10">
                            <PostStatusBadge status={post.status} />
                        </div>
                        <BlogPostCard data={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}

