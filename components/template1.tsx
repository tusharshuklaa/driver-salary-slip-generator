import { FC } from "react";
import Image from "next/image";
import { TemplateProps } from "@/types/globals";
import { useTemplateValues } from "@/hooks/use-template-values";

export const Template1: FC<TemplateProps> = ({
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
        <div className="divide-y-2 divide-black print:p-4">
            <div>
                <h2 className="text-center text-lg print:text-xl font-bold">{heading}</h2>
                <p className="mt-4 print:mt-8">
                    This is to certify that I have paid <strong>{currencySymbol} {salaryAmount}</strong> to driver, <strong className="capitalize"></strong>{driverSalutation} <strong className="capitalize">{driverName}</strong> for the month of <strong className="capitalize">{salaryMonth}</strong> (Acknowledged receipt enclosed).
                    {disclaimer}
                </p>

                <div className="mt-6">
                    <strong>Employee Name: </strong>
                    <span className="capitalize">{employeeName}</span>
                </div>

                <div className="mt-4 mb-6 print:mb-12">
                    <strong>Date: </strong>
                    <span className="capitalize">{payDate}</span>
                </div>
            </div>

            <div>
                <h2 className="text-center text-lg print:text-xl font-bold mt-4 print:mt-12">Receipt Acknowledgement</h2>

                <div className="mt-4 print:mt-8">
                    <strong>Date of Receipt: </strong>
                    <span>{payDate}</span>
                </div>

                <div className="mt-4">
                    <strong>For the Month of: </strong>
                    <span className="capitalize">{salaryMonth}</span>
                </div>

                <div className="mt-4">
                    <strong>Name of Driver: </strong>
                    <span className="capitalize">{driverSalutation} {driverName}</span>
                </div>

                <div className="mt-4">
                    <strong>Vehicle No: </strong>
                    <span className="uppercase">{vehicleNumber}</span>
                </div>

                <p className="mt-6 print:mt-10">
                    Received a sum of <strong>{currencySymbol}{salaryAmount}</strong> only for the month of <strong className="capitalize">{salaryMonth}</strong> from <strong>{employeeSalutation}</strong> <strong className="capitalize">{employeeName}</strong>.
                </p>

                <div className="mt-6 print:mt-16 flex justify-between items-start">
                    <div className="w-full flex flex-col items-center gap-1">
                        <strong>Revenue Stamp</strong>
                        <Image src="/revenue.jpg" alt="Revenue Stamp" width={60} height={70} className="w-auto h-auto" />
                    </div>

                    <div className="w-full flex flex-col items-center gap-1">
                        {
                            signatureImage && (
                                <>
                                    <strong>Signature</strong>
                                    <Image src={signatureImage} alt="driver signature" width={60} height={70} className="w-auto h-auto max-h-[100px]" />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
