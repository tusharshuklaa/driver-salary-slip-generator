'use client';

import React, { FC, useState } from 'react';
import { Alex_Brush } from 'next/font/google';
import Link from 'next/link';
import { ReactHookFormValue } from '@/types/globals';
import { Template1 } from '@/components/template1';
import { Template2 } from '@/components/template2';
import { Template3 } from '@/components/template3';
import { DetailsForm } from '@/components/details-form';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { SaveConfirmationDialog } from '@/components/save-confirmation-dialog';
import { saveFormToLocalStorage } from '@/lib/utils';

const signatureFont = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
});

export const GenerateReceipt: FC<ReactHookFormValue> = ({ form }) => {
    const formValues = form.watch();
    const template = formValues.template;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    let TemplateComp = Template1;

    if (template === "2") {
        TemplateComp = Template2;
    } else if (template === "3") {
        TemplateComp = Template3;
    }

    const handleSaveAndPrint = async () => {
        const result = await saveFormToLocalStorage(form.getValues());
        if (result.imageSkipped) {
            window.alert(
                "Your signature image is too large to save (over 200 KB). The rest of your form data has been saved, but the signature will not be restored next time."
            );
        } else if (result.quotaExceeded) {
            window.alert(
                "Could not save your form data — your browser's storage is full. Please clear some site data and try again."
            );
        }
        // window.print() is called by the dialog after it closes
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 overflow-hidden min-h-max lg:max-h-[80vh] pt-4">
            <section className="w-full print:hidden">
                <DetailsForm form={form} />

                <div className="flex mt-8 justify-center gap-8">
                    <Button variant="destructive" onClick={() => form.reset()}>
                        Reset Form
                    </Button>

                    <Button onClick={() => setIsDialogOpen(true)}>
                        Print PDF
                    </Button>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    There is no PDF file available to download directly. Simply print the page as PDF to save it. For more information on how to print as PDF, please <Button variant={'link'} className="px-1" asChild><Link href="https://www.howtogeek.com/235134/how-to-print-to-pdf-on-any-computer-smartphone-or-tablet/">refer here</Link></Button>.
                    <br />
                    If you&apos;re using this tool on a mobile device, you may not see the preview correctly however the print should workd fine.
                </p>
            </section>

            <div className="w-full">
                {/* aspect ration of an A4 size sheet */}
                <AspectRatio ratio={1 / 1.4142}>
                    <section className="border-2 border-black bg-white p-12 w-full text-black print:border-0 print:p-0">
                        <TemplateComp {...formValues} font={signatureFont} />
                    </section>
                </AspectRatio>
            </div>

            <SaveConfirmationDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSaveAndPrint={handleSaveAndPrint}
                onJustPrint={() => window.print()}
            />
        </div>
    );
};

GenerateReceipt.displayName = 'GenerateReceipt';
