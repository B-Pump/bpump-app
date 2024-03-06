import { cva, type VariantProps } from "class-variance-authority";
import { TouchableOpacity, View } from "react-native";

import { cn } from "@/lib/utils";

export const buttonVariants = cva("flex flex-row items-center justify-center rounded-lg font-medium", {
    variants: {
        variant: {
            default: "bg-primary",
            destructive: "bg-destructive",
            outline: "border border-input bg-background",
            secondary: "bg-secondary",
            ghost: "",
        },
        size: {
            default: "py-3 px-4",
            sm: "py-2 px-4",
            lg: "py-5 px-4",
            icon_sm: "size-10",
            icon_lg: "size-[3.3rem]",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

interface ButtonProps
    extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
        VariantProps<typeof buttonVariants> {}

export function Button({ children, className, variant, size, ...props }: ButtonProps) {
    return (
        <TouchableOpacity {...props}>
            <View className={cn(buttonVariants({ variant, size, className }))}>{children}</View>
        </TouchableOpacity>
    );
}
