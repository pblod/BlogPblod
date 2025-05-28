"use server";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function postHandler(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
        throw new Error("User not authenticated");
    }

    const data = await prisma.blogpost.create({
        data: {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            imageURL: formData.get("imageURL") as string,
            authorId: user.id,
            authorName: user.given_name as string,
            authorImage: user.picture as string,
            status: "pending",
        },
    });
    redirect("/dashboard/pendingPosts");
}

export async function approveBlog(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    
    await prisma.blogpost.update({
        where: { id },
        data: { status: "approved" }
    });
    
    redirect("/dashboard/pendingPosts");
}

export async function disapproveBlog(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    
    await prisma.blogpost.delete({
        where: { id }
    });
    
    redirect("/dashboard/pendingPosts");
}  