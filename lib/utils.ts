import { clsx, type ClassValue } from "clsx";
import { NextFont } from "next/dist/compiled/@next/font";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formSchema = z.object({
  template: z.string().min(1).max(1),
  driverSalutation: z.string().min(2).max(10),
  driverName: z.string({
    required_error: "Driver name is required.",
  }).min(2).max(50),
  employeeSalutation: z.string().min(2).max(10),
  employeeName: z.string({
    required_error: "Employee name is required.",
  }).min(2).max(50),
  vehicleNumber: z.string({
    required_error: "Vehicle number is required.",
  }).min(2).max(10),
  paymentDate: z.date({
    required_error: "Payment date is required.",
  }),
  currency: z.string().min(2).max(3),
  salaryAmount: z.number().min(0),
  salaryMonth: z.string({
    required_error: "Salary month is required.",
  }).min(3).max(9),
  signatureImage: z.string().url(),
  signatureImageSrc: z.string().url(),
  disclaimer: z.string(),
  needRevenueStamp: z.boolean(),
});

export const getSignatureImageUrl = (nameStr: string, font: NextFont, textColor = '#2c2c2c') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = 200;
  canvas.height = 60;

  if (context) {
      const fontFamily = font.style.fontFamily.replace(/['"]+/g, '');
      const name = nameStr.split('').map((char, index) => {
          if (index === 0) {
              return char.toUpperCase();
          }

          return char;
      }).join('');

      context.font = `30px ${fontFamily}, Cursive, Fantasy`;
      context.fillStyle = textColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      context.shadowColor = 'rgba(0, 0, 0, 0.3)';
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.shadowBlur = 3;

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(-0.1);
      context.translate(-canvas.width / 2, -canvas.height / 2);

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      context.fillText(name, x, y);

      // Add an underline beneath the text
      const textWidth = context.measureText(name).width;
      const underlineY = y + 10;
      context.beginPath();
      context.moveTo(x - textWidth / 2, underlineY);
      context.lineTo(x + textWidth / 2, underlineY);
      context.lineWidth = 2;
      context.strokeStyle = textColor;
      context.stroke();

      // Convert the canvas content to a data URL
      return canvas.toDataURL('image/png');
  }

  return "";
};
