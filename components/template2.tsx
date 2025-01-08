import { FC } from "react";
import Image from "next/image";
import { TemplateProps } from "@/types/globals";
import { useTemplateValues } from "@/hooks/use-template-values";

export const Template2: FC<TemplateProps> = ({
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
}) => {
    const { payDate, currencySymbol, signatureImage } = useTemplateValues(paymentDate, currency, signatureImageSrc, driverName, font);

    return (
        <div className="print:p-4">
            <div>
                <h2 className="text-center text-lg print:text-xl font-bold">{heading}</h2>

                <div className="mt-6">
                    <strong>Vehicle Number: </strong>
                    <span className="uppercase">{vehicleNumber}</span>
                </div>

                <div className="mt-4 mb-6">
                    <strong>Salary of the Month: </strong>
                    <span className="capitalize">{salaryMonth}</span>
                </div>

                <div className="mt-4 mb-6">
                    <strong>Amount Paid: </strong>
                    <span className="capitalize">{currencySymbol}{salaryAmount}</span>
                </div>

                <div className="mt-4">
                    <strong>Date of Receipt: </strong>
                    <span>{payDate}</span>
                </div>

                <p className="mt-4">
                    Received from <span className="capitalize">{employeeSalutation} {employeeName}</span> <strong>{currencySymbol}{salaryAmount}</strong> to driver <span className="capitalize">{driverSalutation} {driverName}</span> towards salary of the month of <strong className="capitalize">{salaryMonth}</strong>.&nbsp;
                    {disclaimer}
                </p>

                <div className="flex justify-end gap-2 mt-6 print:mt-12">
                    <strong>Employee Name: </strong>
                    <span className="capitalize">{employeeName}</span>
                </div>
            </div>

            <div>
                <h2 className="text-center text-lg print:text-xl font-bold mt-4 print:mt-32">Receipt Acknowledgement</h2>

                <div className="mt-4 print:mt-8">
                    <strong>Salary of the Month: </strong>
                    <span className="capitalize">{salaryMonth}</span>
                </div>

                <div className="mt-4">
                    <strong>Amount Paid: </strong>
                    <span>{currencySymbol}{salaryAmount}</span>
                </div>

                <div className="mt-4">
                    <strong>Date: </strong>
                    <span>{payDate}</span>
                </div>

                <p className="mt-4">
                    Received from <span className="capitalize">{employeeSalutation} {employeeName}</span> <strong>{currencySymbol}{salaryAmount}</strong> to driver <span className="capitalize">{driverSalutation} {driverName}</span> towards salary of the month of <strong className="capitalize">{salaryMonth}</strong>
                </p>

                <div className="mt-6 print:mt-16 flex justify-between items-start">
                    <div className="flex flex-col gap-3">
                        <strong>Revenue Stamp</strong>
                        <Image src="/revenue.jpg" alt="Revenue Stamp" width={60} height={70} className="h-auto max-h-[100px] ml-4" />
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-4">
                                <strong>Driver Name: </strong>
                                <strong>Signature: </strong>
                            </div>

                            <span className="capitalize">{driverName}</span>
                        </div>

                        {
                            signatureImage && (
                                <Image src={signatureImage} alt="driver signature" width={60} height={70} className="w-auto h-auto max-h-[100px]" />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
