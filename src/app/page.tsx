import Image from "next/image";
import Link from "next/link";
import { prisma } from "./utils/db";
import type { Blogpost } from "@prisma/client";
import { BlogPostCard } from "../../components/general/blogPostCard";

async function getData() {
  const data = await prisma.blogpost.findMany({
    where: {
      status: "approved"
    },
    orderBy: {
      createdAt: 'desc'  // Show newest posts first
    },
    select: {
      title: true,
      content: true,
      imageURL: true,
      authorId: true,
      authorName: true,
      authorImage: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
  });

  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-8">
        Latest Blogposts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((post: Blogpost) => (
          <BlogPostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
