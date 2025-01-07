import { getSignatureImageUrl } from "@/lib/utils";
import { NextFont } from "next/dist/compiled/@next/font";
import { useState, useEffect } from "react";

export const useTemplateValues = (paymentDate: Date, currency: string, signatureImageSrc: string, driverName: string, font: NextFont) => {
    const payDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(paymentDate);
    const currencySymbol = currency.split("__")[0];

    const [driverSignatureImage, setDriverSignatureImage] = useState(signatureImageSrc);

    useEffect(() => {
        const signImage = !signatureImageSrc ? getSignatureImageUrl(driverName, font) : signatureImageSrc;

        setDriverSignatureImage(signImage);
    }, [driverName, font, signatureImageSrc]);

    return {
        payDate,
        currencySymbol,
        signatureImage: driverSignatureImage,
    };
};