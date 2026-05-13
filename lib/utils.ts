import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
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

// ─── localStorage persistence ────────────────────────────────────────────────

export const STORAGE_KEY = "driver_slip_form_data";

export const DEFAULT_DISCLAIMER =
  "I also declare that the driver is exclusively utilized for official purpose only. Please reimburse the above amount. I further declare that what is stated above is correct and true.";

/** Maximum base64 length (~200 KB) before we skip persisting the signature. */
const IMAGE_SIZE_LIMIT = 204800;

export type StoredFormData = {
  version: 1;
  template: string;
  driverSalutation: string;
  driverName: string;
  employeeSalutation: string;
  employeeName: string;
  vehicleNumber: string;
  /** Day-of-month only (1–31). Month + year are derived from the current date at restore time. */
  paymentDay: number;
  currency: string;
  salaryAmount: number;
  /** Base64 data URL, or empty string when image was absent or too large. */
  signatureImageData: string;
  /** null means the default disclaimer was in use — don't store it verbatim. */
  disclaimer: string | null;
  needRevenueStamp: boolean;
};

export type SaveResult = {
  imageSkipped: boolean;
  quotaExceeded: boolean;
};

/** Converts a blob: URL to a base64 data URL. */
const blobUrlToDataUrl = (blobUrl: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fetch(blobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });

/**
 * Serialises the current form values to localStorage.
 * - Converts blob: signature URLs to base64 (with a size gate).
 * - Skips the disclaimer when it matches the default.
 * - Returns flags indicating whether the image or full save was skipped.
 */
export const saveFormToLocalStorage = async (
  values: z.infer<typeof formSchema>
): Promise<SaveResult> => {
  const result: SaveResult = { imageSkipped: false, quotaExceeded: false };

  let signatureImageData = "";

  if (values.signatureImageSrc.startsWith("blob:")) {
    try {
      signatureImageData = await blobUrlToDataUrl(values.signatureImageSrc);
    } catch {
      signatureImageData = "";
    }
  } else if (values.signatureImageSrc.startsWith("data:")) {
    signatureImageData = values.signatureImageSrc;
  }

  if (signatureImageData.length > IMAGE_SIZE_LIMIT) {
    signatureImageData = "";
    result.imageSkipped = true;
  }

  const stored: StoredFormData = {
    version: 1,
    template: values.template,
    driverSalutation: values.driverSalutation,
    driverName: values.driverName,
    employeeSalutation: values.employeeSalutation,
    employeeName: values.employeeName,
    vehicleNumber: values.vehicleNumber,
    paymentDay: values.paymentDate.getDate(),
    currency: values.currency,
    salaryAmount: values.salaryAmount,
    signatureImageData,
    disclaimer: values.disclaimer === DEFAULT_DISCLAIMER ? null : values.disclaimer,
    needRevenueStamp: values.needRevenueStamp,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (err) {
    if (err instanceof DOMException) {
      result.quotaExceeded = true;
    }
  }

  return result;
};

/**
 * Reads saved form data from localStorage and reconstructs values suitable
 * for `form.reset()`. Returns null when nothing is stored or data is invalid.
 *
 * Date handling: the saved day-of-month is applied against the current
 * month + year. If that produces an overflow (e.g. day 31 in February),
 * today's date is used instead.
 */
export const loadFormFromLocalStorage = (): Partial<z.infer<typeof formSchema>> | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const stored: StoredFormData = JSON.parse(raw) as StoredFormData;
    if (stored.version !== 1) return null;

    const today = new Date();
    const candidate = new Date(today.getFullYear(), today.getMonth(), stored.paymentDay);
    const paymentDate =
      candidate.getMonth() === today.getMonth() ? candidate : today;

    return {
      template: stored.template,
      driverSalutation: stored.driverSalutation,
      driverName: stored.driverName,
      employeeSalutation: stored.employeeSalutation,
      employeeName: stored.employeeName,
      vehicleNumber: stored.vehicleNumber,
      paymentDate,
      salaryMonth: format(today, "MMMM"),
      currency: stored.currency,
      salaryAmount: stored.salaryAmount,
      signatureImage: "",
      signatureImageSrc: stored.signatureImageData,
      disclaimer: stored.disclaimer ?? DEFAULT_DISCLAIMER,
      needRevenueStamp: stored.needRevenueStamp,
    };
  } catch {
    return null;
  }
};
