import { NextFont } from "next/dist/compiled/@next/font";

export type ReactHookFormValue = {
    form: UseFormReturn<z.infer<typeof formSchema>>;
};

export type TemplateProps = {
    heading?: string;
    salaryAmount: number;
    currency: string;
    driverSalutation: string;
    driverName: string;
    salaryMonth: string;
    employeeSalutation: string;
    employeeName: string;
    paymentDate: Date;
    vehicleNumber: string;
    signatureImage?: string;
    signatureImageSrc: string;
    disclaimer?: string;
    font: NextFont;
    needRevenueStamp: boolean;
};
