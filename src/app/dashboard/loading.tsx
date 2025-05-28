"use client";

import { Skeleton } from "../../components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="py-8">
            <Skeleton className="h-12 w-96 mb-4" />
            <div className="flex items-center mb-5">
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            </div>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative">
                        <div className="absolute top-4 right-4 z-10">
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="group relative h-[300px] overflow-hidden rounded-lg border-5 border-green-200 bg-black/5">
                            <Skeleton className="h-full w-full" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-32 ml-2" />
                                <Skeleton className="h-4 w-24 ml-auto" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 