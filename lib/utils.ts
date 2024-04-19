import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges CSS classes provided as arguments into a single string, optimizing Tailwind CSS classes using tailwind-merge
 * @author shadcn
 * @param {ClassValue[]} ...inputs {@link ClassValue ClassValue}
 * @returns {string}
 * @see https://ui.shadcn.com/
 * @see https://www.npmjs.com/package/tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
