import { FC } from "react";

type FormContainerProps = {
    children: React.ReactNode;
    heading: string;
};

export const FormContainer: FC<FormContainerProps> = ({ children, heading }) => (
    <div data-heading={heading} className="border border-primary p-6 rounded-md relative before:absolute before:inset-0 before:border before:border-primary before:rounded-md before:content-[attr(data-heading)] before:z-[1] before:h-8 before:w-max before:flex before:items-center before:p-4 before:text-zinc-300 before:bg-green-700 before:-top-4 before:left-4">
        { children }
    </div>
);