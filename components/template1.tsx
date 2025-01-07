import Image from "next/image";
import { FC } from "react";

export const Template1: FC<TemplateProps> = ({
    heading = "Driver Salary Receipt",
    salaryAmount = 10000,
    currency = "₹",
    driverSalutation = "Mr.",
    driverName = "",
    salaryMonth = "January",
    employeeSalutation = "Mr.",
    employeeName = "Employee",
    paymentDate = new Date(),
    vehicleNumber = "",
    signatureImageSrc = "",
}) => {
    const payDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(paymentDate);
    const currencySymbol = currency.split("__")[0];

    return (
        <div className="divide-y-2 divide-black">
            <div>
                <h2 className="text-center text-lg font-bold">{heading}</h2>
                <p className="mt-4">
                    This is to certify that I have paid <strong>{currencySymbol} {salaryAmount}</strong> to driver, {driverSalutation} <strong>{driverName}</strong> for the month of <strong>{salaryMonth}</strong> (Acknowledged receipt enclosed).
                    I also declare that the driver is exclusively utilized for official purpose only. Please reimburse the above amount. I further declare that what is stated above is correct and true.
                </p>

                <div className="mt-6">
                    <strong>Employee Name: </strong>
                    <span>{employeeName}</span>
                </div>

                <div className="mt-4 mb-6">
                    <strong>Date: </strong>
                    <span>{payDate}</span>
                </div>
            </div>

            <div>
                <h2 className="text-center text-lg font-bold mt-4">Receipt Acknowledgement</h2>

                <div className="mt-4">
                    <strong>Date of Receipt: </strong>
                    <span>{payDate}</span>
                </div>

                <div className="mt-4">
                    <strong>For the Month of: </strong>
                    <span>{salaryMonth}</span>
                </div>

                <div className="mt-4">
                    <strong>Name of Driver: </strong>
                    <span>{driverSalutation} {driverName}</span>
                </div>

                <div className="mt-4">
                    <strong>Vehicle No: </strong>
                    <span>{vehicleNumber}</span>
                </div>

                <div className="mt-6">
                    Received a sum of <strong>{currencySymbol}{salaryAmount}</strong> only for the month of <strong>{salaryMonth}</strong> from <strong>{employeeSalutation} {employeeName}</strong>.
                </div>

                <div className="mt-6 flex justify-between items-start">
                    <div className="w-full flex flex-col items-center gap-1">
                        <strong>Revenue Stamp</strong>
                        <Image src="/revenue.jpg" alt="Revenue Stamp" width={60} height={70} />
                    </div>

                    <div className="w-full flex flex-col items-center gap-1">
                        {
                            signatureImageSrc && (
                                <>
                                    <strong>Signature</strong>
                                    <Image src={signatureImageSrc} alt="driver signature" width={60} height={70} />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
