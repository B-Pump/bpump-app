import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
    return (
        <View className="flex">
            {/* TODO: adapter la forme des skeletons à celle des badge */}
            <Skeleton className="mb-1 h-4 w-48" />
            <Skeleton className="mb-1 h-4 w-60" />
            <Skeleton className="mb-1 h-4 w-56" />
            <Skeleton className="h-4 w-36" />
        </View>
    );
}

export function ProgsSkeleton() {
    return (
        <View className="flex">
            {/* TODO: adapter la forme des skeletons à celle des progs card */}
            <Skeleton className="mb-1 h-4 w-48" />
            <Skeleton className="mb-1 h-4 w-60" />
            <Skeleton className="mb-1 h-4 w-56" />
            <Skeleton className="h-4 w-36" />
        </View>
    );
}

export function ExosSkeleton() {
    return (
        <View className="flex">
            {/* TODO: adapter la forme des skeletons à celle des exos card */}
            <Skeleton className="mb-1 h-4 w-48" />
            <Skeleton className="mb-1 h-4 w-60" />
            <Skeleton className="mb-1 h-4 w-56" />
            <Skeleton className="h-4 w-36" />
        </View>
    );
}
