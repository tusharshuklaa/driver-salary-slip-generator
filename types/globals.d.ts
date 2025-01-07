declare type ReactHookFormValue = {
    form: UseFormReturn<z.infer<typeof formSchema>>;
};

declare type TemplateProps = {
    heading?: string;
    salaryAmount?: number;
    currency?: string;
    driverSalutation?: string;
    driverName?: string;
    salaryMonth?: string;
    employeeSalutation?: string;
    employeeName?: string;
    paymentDate?: Date;
    vehicleNumber?: string;
    signatureImageSrc?: string;
};
