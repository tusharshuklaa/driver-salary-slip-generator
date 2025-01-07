"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { GenerateReceipt } from "@/components/generate-receipt";
import { SelectTemplate } from "@/components/select-template";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/utils";

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: "1",
      driverName: "",
      vehicleNumber: "",
      employeeName: "",
      salaryAmount: 0,
      signatureImage: "",
      signatureImageSrc: "",
    },
  });

  const currentYear = new Date().getFullYear();

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 space-y-8 print:space-y-0 print:py-0 print:px-0">
      <h1 className="text-center text-3xl mb-8 print:hidden">Driver Salary Slip Generator</h1>

      <SelectTemplate form={form} />

      <GenerateReceipt form={form} />

      <footer className="text-center text-sm text-gray-500 print:hidden border-t border-gray-200 py-4">
        <p>Created by <Button variant={'link'} className="tracking-wide px-1" asChild><Link href="https://github.com/tusharshuklaa">Tushar Shukla</Link></Button></p>
        <p className="mb-4"><a href="https://www.flaticon.com/free-icons/receipt" title="receipt icons">Receipt icon created by Freepik - Flaticon</a></p>
        <p>&copy; {currentYear} All Rights Reserved</p>
      </footer>
    </main>
  );
};
