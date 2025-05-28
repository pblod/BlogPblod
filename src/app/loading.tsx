"use client";

import { Skeleton } from "../components/ui/skeleton";

export default function Loading() {
    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <Skeleton className="h-10 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="group relative h-[300px] overflow-hidden rounded-lg border-5 border-green-200 bg-black/5">
                        <Skeleton className="h-full w-full" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-32 ml-2" />
                            <Skeleton className="h-4 w-24 ml-auto" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 