import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";

import { useColorScheme } from "@/lib/color";
import { cn } from "@/lib/utils";

import { globals } from "@/styles/globals";

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
    label?: string;
    labelClasses?: string;
    inputClasses?: string;
}

export const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
    ({ className, label, labelClasses, inputClasses, ...props }, ref) => {
        const { isDarkColorScheme } = useColorScheme();

        return (
            <View className={cn("flex flex-col gap-1.5", className)}>
                {label && <Text className={cn("text-foreground", labelClasses)}>{label}</Text>}
                <TextInput
                    className={cn(inputClasses, "border border-input py-2.5 px-4 rounded-lg")}
                    placeholderClassName="text-muted-foreground"
                    cursorColor={isDarkColorScheme ? globals.dark.primary : globals.light.primary}
                    style={{ color: isDarkColorScheme ? "white" : "black" }}
                    {...props}
                />
            </View>
        );
    },
);
