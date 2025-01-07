import { clsx, type ClassValue } from "clsx";
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
});
