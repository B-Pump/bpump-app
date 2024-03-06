import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
    return (
        <View className="flex">
            {/* TODO: adapter la forme des skeletons à celle des badge */}
            <Skeleton className="w-48 h-4 mb-1" />
            <Skeleton className="w-60 h-4 mb-1" />
            <Skeleton className="w-56 h-4 mb-1" />
            <Skeleton className="w-36 h-4" />
        </View>
    );
}

export function ProgsSkeleton() {
    return (
        <View className="flex">
            {/* TODO: adapter la forme des skeletons à celle des progs card */}
            <Skeleton className="w-48 h-4 mb-1" />
            <Skeleton className="w-60 h-4 mb-1" />
            <Skeleton className="w-56 h-4 mb-1" />
            <Skeleton className="w-36 h-4" />
        </View>
    );
}

export function ExosSkeleton() {
    return (
        <View className="flex">
            {/* TODO: adapter la forme des skeletons à celle des exos card */}
            <Skeleton className="w-48 h-4 mb-1" />
            <Skeleton className="w-60 h-4 mb-1" />
            <Skeleton className="w-56 h-4 mb-1" />
            <Skeleton className="w-36 h-4" />
        </View>
    );
}
