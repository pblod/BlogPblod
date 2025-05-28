import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/app/utils/db";
import { approveBlog, disapproveBlog } from "@/app/action";
import Image from "next/image";

async function getPendingPosts() {
    const posts = await prisma.blogpost.findMany({
        where: {
            status: "pending"
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return posts;
}

export default async function PendingPosts() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Check if user is admin (ben12tend@gmail.com)
    if (!user || user.email !== "ben12tend@gmail.com") {
        redirect("/dashboard");
    }

    const pendingPosts = await getPendingPosts();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-white">Pending Posts for Review</h1>
            {pendingPosts.length === 0 ? (
                <p className="text-white">No pending posts to review.</p>
            ) : (
                <div className="grid gap-4">
                    {pendingPosts.map((post) => (
                        <Card key={post.id} className="border-3 border-white bg-black">
                            <CardHeader>
                                <CardTitle className="text-white">{post.title}</CardTitle>
                                <CardDescription className="text-white">
                                    Submitted by: {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-white mb-4">{post.content}</div>
                                {post.imageURL && (
                                    <div className="relative h-48 mb-4">
                                        <Image 
                                            src={post.imageURL} 
                                            alt="Post image"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                )}
                                <div className="flex gap-4">
                                    <form action={approveBlog}>
                                        <input type="hidden" name="id" value={post.id} />
                                        <Button 
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Approve
                                        </Button>
                                    </form>
                                    <form action={disapproveBlog}>
                                        <input type="hidden" name="id" value={post.id} />
                                        <Button 
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Disapprove
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
