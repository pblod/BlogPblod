"use client";

import Image from "next/image";
import Link from "next/link";
import type { Blogpost } from "@prisma/client";

interface BlogPostCardProps {
    data: Blogpost;
}

export function BlogPostCard({ data }: BlogPostCardProps) {
    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent the card link from triggering
        window.open(data.imageURL, '_blank');
    };

    return (
        <Link href={`/posts/${data.id}`}>
            <div className="group relative h-[300px] overflow-hidden rounded-lg border-5 border-green-200 bg-black shadow-md transition-all hover:shadow-lg">
                {/* Image Container with click handler */}
                <div 
                    className="relative h-full w-full cursor-pointer" 
                    onClick={handleImageClick}
                    title="Click to view full image"
                >
                    <Image 
                        src={data.imageURL}
                        alt={data.title}
                        fill
                        className="object-cover transition-all group-hover:scale-105"
                    />
                    {/* Image click indicator */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        🔍 View Image
                    </div>

                    {/* Content Overlay - Hidden by default, shown on hover */}
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-70 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-80 cursor-pointer" 
                        onClick={handleImageClick}
                    >
                        <div className="flex h-full flex-col justify-start">
                            <h3 className="text-lg font-semibold text-white">{data.title}</h3>
                            <p className="mt-2 text-sm text-white line-clamp-6">{data.content}</p>
                            <div className="mt-auto text-sm text-white opacity-75">Click anywhere to view full image</div>
                        </div>
                    </div>
                </div>

                {/* Author info - Always visible at bottom with gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center">
                        <Image
                            src={data.authorImage}
                            alt={data.authorName}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="ml-2 text-sm text-white">{data.authorName}</span>
                        <p className="text-md text-white ml-auto">{data.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}