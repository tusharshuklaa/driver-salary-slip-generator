import { ComponentProps, FC } from "react";

export const FormRow: FC<ComponentProps<'div'>> = ({ children }) => {
    return (
        <div className="flex gap-2 justify-between items-center mb-3">
            {children}
        </div>
    );
};
