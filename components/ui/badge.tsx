import { cva, type VariantProps } from "class-variance-authority";
import { Text, View } from "react-native";

import { cn } from "@/lib/utils";

export const badgeVariants = cva("flex flex-row items-center rounded-full px-3 py-2 font-semibold", {
    variants: {
        variant: {
            default: "bg-primary",
            secondary: "bg-secondary",
            destructive: "bg-destructive",
            success: "bg-green-500 dark:bg-green-700",
            outline: "dark:bg-secondary border border-solid border-border",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const badgeTextVariants = cva("font-medium text-center", {
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

export interface BadgeProps extends React.ComponentPropsWithoutRef<typeof View>, VariantProps<typeof badgeVariants> {
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
