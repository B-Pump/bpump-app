import { cva, type VariantProps } from "class-variance-authority";
import { Text, View } from "react-native";

import { cn } from "@/lib/utils";

export const badgeVariants = cva("flex rounded-full px-3 py-2 font-semibold", {
    variants: {
        variant: {
            default: "bg-primary",
            secondary: "bg-secondary",
            destructive: "bg-destructive",
            success: "bg-green-500 dark:bg-green-700",
            outline: "border border-solid border-border dark:bg-secondary",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const badgeTextVariants = cva("text-center font-medium", {
    variants: {
        variant: {
            default: "text-primary-foreground",
            secondary: "text-secondary-foreground",
            destructive: "text-destructive-foreground",
            success: "text-green-100",
            outline: "text-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface BadgeProps extends React.ComponentPropsWithoutRef<typeof View>, VariantProps<typeof badgeVariants> {
    label: string;
    labelClasses?: string;
}

export function Badge({ label, labelClasses, className, variant, ...props }: BadgeProps) {
    return (
        <View className={cn(badgeVariants({ variant }), className)} {...props}>
            <Text className={cn(badgeTextVariants({ variant }), labelClasses)}>{label}</Text>
        </View>
    );
}
