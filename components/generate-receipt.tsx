'use client';

import React, { FC } from 'react';
import { Template1 } from '@/components/template1';
import { DetailsForm } from '@/components/details-form';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from './ui/button';
import Link from 'next/link';

export const GenerateReceipt: FC<ReactHookFormValue> = ({ form }) => {
    const formValues = form.watch();
    const template = formValues.template;

    let TemplateComp = Template1;

    if (template === "2") {
        TemplateComp = Template1;
    } else if (template === "3") {
        TemplateComp = Template1;
    }

    return (
        <div className="flex gap-8 overflow-hidden max-h-[80vh] pt-4">
            <section className="w-full print:hidden">
                <DetailsForm form={form} />

                <div className="flex mt-8 justify-center">
                    <Button onClick={() => window.print()}>
                        Print PDF
                    </Button>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    There is no PDF file available to download directly. Simply print the page as PDF to save it. For more information on how to print as PDF, please <Button variant={'link'} className="px-1" asChild><Link href="https://www.howtogeek.com/235134/how-to-print-to-pdf-on-any-computer-smartphone-or-tablet/">refer here</Link></Button>.
                </p>
            </section>

            {/* aspect ration of an A4 size sheet */}
            <AspectRatio ratio={1 / 1.4142}>
                <section className="border-2 border-black bg-white p-12 w-full text-black print:border-0 print:p-0">
                    <TemplateComp {...formValues} />
                </section>
            </AspectRatio>
        </div>
    );
};

GenerateReceipt.displayName = 'GenerateReceipt';
