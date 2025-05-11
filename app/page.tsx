"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { format } from "date-fns";
import { GenerateReceipt } from "@/components/generate-receipt";
import { SelectTemplate } from "@/components/select-template";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/utils";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const defaultSalaryMonth = format(new Date(), "MMMM");
  const today = new Date();

  // Set default values for the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: "1",
      driverName: "",
      driverSalutation: "Mr.",
      vehicleNumber: "",
      employeeSalutation: "Mr.",
      employeeName: "",
      currency: "₹__68",
      paymentDate: today,
      salaryAmount: 0,
      salaryMonth: defaultSalaryMonth,
      signatureImage: "",
      signatureImageSrc: "",
      disclaimer: "I also declare that the driver is exclusively utilized for official purpose only. Please reimburse the above amount. I further declare that what is stated above is correct and true.",
      needRevenueStamp: true,
    },
  });

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 space-y-8 print:space-y-0 print:py-0 print:px-0">
      <h1 className="text-center text-3xl mb-8 print:hidden">Driver Salary Slip Generator</h1>

      <SelectTemplate form={form} />

      <GenerateReceipt form={form} />

      <footer className="text-center text-sm text-gray-500 print:hidden border-t border-gray-200 py-4">
        <p className="mb-8">
          See an issue in the app? <Button variant={'link'} className="tracking-wide px-1" asChild><Link href="https://github.com/tusharshuklaa/driver-salary-slip-generator/issues/new?assignees=tusharshuklaa&labels=bug&projects=&template=bug_report.md&title=">Let me know!</Link></Button> Have a feature request? Feel free to <Button variant={'link'} className="tracking-wide px-1" asChild><Link href="https://github.com/tusharshuklaa/driver-salary-slip-generator/issues/new?assignees=tusharshuklaa&labels=enhancement&projects=&template=feature_request.md&title=">suggest</Link></Button>.
        </p>
        <p>Created by <Button variant={'link'} className="tracking-wide px-1" asChild><Link href="https://github.com/tusharshuklaa">Tushar Shukla</Link></Button></p>
        <p className="mb-4"><a href="https://www.flaticon.com/free-icons/receipt" title="receipt icons">Receipt icon created by Freepik - Flaticon</a></p>
        <p>&copy; {currentYear} All Rights Reserved</p>
      </footer>
    </main>
  );
};
