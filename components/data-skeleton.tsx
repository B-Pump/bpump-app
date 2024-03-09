import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";

function ProgsSkeleton() {
    return (
        <View className="my-1">
            <View className="w-[300px] rounded-lg border border-border p-6">
                <View className="justify-between rounded-xl">
                    <Skeleton className="size-14" />
                </View>
                <View className="mt-5">
                    <Skeleton className="h-5 w-[250px]" />
                </View>
                <View className="mt-5">
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-5 w-[100px]" />
                </View>
            </View>
        </View>
    );
}

function ExosSkeleton() {
    return (
        <View className="my-1">
            <View className="flex-row rounded-lg border border-border p-6">
                <View className="items-center justify-between rounded-xl">
                    <Skeleton className="size-14" />
                </View>
                <View className="ml-7 justify-center">
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-5 w-[100px]" />
                </View>
            </View>
        </View>
    );
}

export const CategorySkeletonList = ({ count }) => {
    const categorySkeletons = [];
    for (let i = 0; i < count; i++) categorySkeletons.push(<Skeleton className="h-8 w-28 rounded-full" key={i} />);

    return <>{categorySkeletons}</>;
};

export const ProgsSkeletonList = ({ count }) => {
    const progsSkeletons = [];
    for (let i = 0; i < count; i++) progsSkeletons.push(<ProgsSkeleton key={i} />);

    return <>{progsSkeletons}</>;
};

export const ExosSkeletonList = ({ count }) => {
    const exosSkeletons = [];
    for (let i = 0; i < count; i++) exosSkeletons.push(<ExosSkeleton key={i} />);

    return <>{exosSkeletons}</>;
};
