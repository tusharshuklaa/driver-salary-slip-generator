'use client';

import { FC, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type SaveConfirmationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveAndPrint: () => Promise<void>;
  onJustPrint: () => void;
};

export const SaveConfirmationDialog: FC<SaveConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
  onSaveAndPrint,
  onJustPrint,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const triggerPrintAfterClose = (printFn: () => void) => {
    // Wait for the dialog exit animation (~200 ms) before invoking print,
    // so the portal content is fully gone from the rendered page.
    setTimeout(printFn, 250);
  };

  const handleSaveAndPrint = async () => {
    setIsSaving(true);
    try {
      await onSaveAndPrint();
    } finally {
      setIsSaving(false);
      onOpenChange(false);
      triggerPrintAfterClose(() => window.print());
    }
  };

  const handleJustPrint = () => {
    onOpenChange(false);
    triggerPrintAfterClose(() => {
      onJustPrint();
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Print PDF</AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to save your form details for next time?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            onClick={handleJustPrint}
            disabled={isSaving}
          >
            Just Print
          </Button>

          <Button onClick={handleSaveAndPrint} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save & Print'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

SaveConfirmationDialog.displayName = 'SaveConfirmationDialog';
