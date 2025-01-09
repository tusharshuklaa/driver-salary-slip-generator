import { FC } from "react";
import Image from "next/image";
import { TemplateProps } from "@/types/globals";
import { useTemplateValues } from "@/hooks/use-template-values";

export const Template3: FC<TemplateProps> = ({
    heading = "Driver Salary Receipt",
    salaryAmount = 10000,
    currency = "₹",
    driverSalutation = "Mr.",
    driverName = "",
    salaryMonth = "January",
    employeeSalutation = "Mr.",
    employeeName = "",
    paymentDate = new Date(),
    vehicleNumber = "",
    signatureImageSrc = "",
    disclaimer,
    font,
    needRevenueStamp,
}) => {
    const { payDate, currencySymbol, signatureImage } = useTemplateValues(paymentDate, currency, signatureImageSrc, driverName, font);

    return (
        <div className="print:p-4">
            <div>
                <h2 className="text-center text-lg print:text-xl font-bold">{heading}</h2>

                <p className="mt-6">
                    This is to certify that <strong className="capitalize">{employeeSalutation} {employeeName}</strong> have paid <strong>{currencySymbol}{salaryAmount}</strong> to driver <strong className="capitalize">{driverSalutation} {driverName}</strong> towards salary of the month of <strong className="capitalize">{salaryMonth}</strong>.&nbsp;
                    {disclaimer}
                </p>

                <div className="mt-12 flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <strong>Vehicle Number: </strong>
                        <span className="uppercase">{vehicleNumber}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <strong>Date: </strong>
                        <span>{payDate}</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <strong>Driver Name: </strong>
                        <span className="capitalize">{driverSalutation} {driverName}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <strong>Employee Name: </strong>
                        <span className="capitalize">{employeeSalutation} {employeeName}</span>
                    </div>
                </div>
            </div>

            <div className="mt-16 flex justify-between items-start">
                <div className="flex flex-col gap-3">
                    {
                        needRevenueStamp && (
                            <>
                                <strong>Revenue Stamp</strong>
                                <Image src="/revenue.jpg" alt="Revenue Stamp" width={60} height={70} className="h-auto max-h-[100px] ml-4" />
                            </>
                        )
                    }
                </div>

                <div className="flex flex-col items-center">
                    <strong>Driver Signature: </strong>

                    {
                        signatureImage && (
                            <Image src={signatureImage} alt="driver signature" width={60} height={70} className="w-auto h-auto max-h-[100px]" />
                        )
                    }
                </div>
            </div>
        </div>
    );
};
