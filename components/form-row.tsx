import { cn } from "@/lib/utils";
import { ComponentProps, FC } from "react";

export const FormRow: FC<ComponentProps<'div'>> = ({ children, className }) => {
    return (
        <div className={cn("flex gap-2 justify-between items-center mb-3", className)}>
            {children}
        </div>
    );
};
