"use client";

import { FC, FormEvent, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CalendarIcon, XCircle } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ReactHookFormValue } from '@/types/globals';
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormRow } from "@/components/form-row";
import { FormContainer } from "@/components/form-container";
import Currencies from "@/data/currency.json";
import { Checkbox } from "@/components/ui/checkbox";

type Currency = {
    text: string;
    value: string;
};

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const DetailsForm: FC<ReactHookFormValue> = ({ form }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const allCurrencies = Currencies.map((currency: Currency, index: number) => ({
        ...currency,
        value: `${currency.value}__${index}`,
    }));
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        return;
    };

    const signatureImageSrc = form.watch('signatureImageSrc');
    const driverName = form.watch('driverName');
    const signatureOffsetX = form.watch('signatureOffsetX');
    const signatureOffsetY = form.watch('signatureOffsetY');
    const signatureRotation = form.watch('signatureRotation');
    const signatureScale = form.watch('signatureScale');
    const hasSignature = !!(signatureImageSrc || driverName);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            // Update the form state with the image URL
            form.setValue('signatureImageSrc', imageUrl);
        }
    };

    const handleRemoveSignature = () => {
        form.setValue('signatureImage', '');
        form.setValue('signatureImageSrc', '');
    };

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
                <FormContainer heading="Driver Details">
                    <FormRow>
                        <FormField
                            control={form.control}
                            name="driverSalutation"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Salutation</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Mr / Mrs" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Mr.">Mr.</SelectItem>
                                            <SelectItem value="Mrs.">Mrs.</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="driverName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Driver Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormRow>
                </FormContainer>

                <FormContainer heading="Employee Details">
                    <FormRow>
                        <FormField
                            control={form.control}
                            name="employeeSalutation"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Salutation</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Mr / Mrs" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Mr.">Mr.</SelectItem>
                                            <SelectItem value="Mrs.">Mrs.</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="employeeName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Employee Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="employer name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormRow>

                    <FormField
                        control={form.control}
                        name="vehicleNumber"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Vehicle Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="vehicle number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormContainer>

                <FormContainer heading="Payment Details">
                    <FormRow>
                        <FormField
                            control={form.control}
                            name="paymentDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Payment Date</FormLabel>
                                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                                onDayClick={ () => setIsDatePickerOpen(false) }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Currency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Currency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                allCurrencies.map(({ text, value }: Currency) => {
                                                    return (
                                                        <SelectItem key={value} value={value} aria-label={text}>
                                                            {text}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormRow>

                    <FormRow>
                        <FormField
                            control={form.control}
                            name="salaryAmount"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Salary Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="10000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="salaryMonth"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Salary Month</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                MONTHS.map((month: string) => (
                                                    <SelectItem key={month} value={month} aria-label={month}>
                                                        {month}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormRow>
                </FormContainer>

                <FormContainer heading="Images">
                    <FormRow className="mt-2">
                        <FormField
                            control={form.control}
                            name="needRevenueStamp"
                            render={({ field }) => (
                                <FormItem className="w-full flex items-center gap-4">
                                    <FormLabel>Need Revenue Stamp?</FormLabel>
                                    <FormControl>
                                    <Checkbox
                                        className="!mt-0"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </FormRow>

                    <FormRow>
                        <FormField
                            control={form.control}
                            name="signatureImage"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Signature</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            placeholder="Choose a file..."
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleImageChange(e);
                                            }}
                                        />
                                    </FormControl>
                                    {signatureImageSrc && (
                                        <div className="flex items-center gap-3 mt-2">
                                            <Image
                                                src={signatureImageSrc}
                                                alt="Signature preview"
                                                width={160}
                                                height={40}
                                                unoptimized
                                                className="h-10 w-auto rounded border border-border object-contain bg-white px-1"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive gap-1 px-2"
                                                onClick={handleRemoveSignature}
                                            >
                                                <XCircle className="h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormRow>

                    {hasSignature && (
                        <details className="mt-2">
                            <summary className="cursor-pointer text-sm font-medium text-muted-foreground select-none hover:text-foreground transition-colors">
                                Adjust signature position
                            </summary>

                            <div className="mt-3 space-y-3 pl-1">
                                <div className="flex items-center gap-3">
                                    <label className="w-28 shrink-0 text-sm">Horizontal</label>
                                    <input
                                        type="range"
                                        min={-100}
                                        max={100}
                                        step={1}
                                        className="flex-1 accent-primary"
                                        {...form.register('signatureOffsetX', { valueAsNumber: true })}
                                    />
                                    <span className="w-14 text-right text-sm tabular-nums text-muted-foreground">{signatureOffsetX}px</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="w-28 shrink-0 text-sm">Vertical</label>
                                    <input
                                        type="range"
                                        min={-100}
                                        max={100}
                                        step={1}
                                        className="flex-1 accent-primary"
                                        {...form.register('signatureOffsetY', { valueAsNumber: true })}
                                    />
                                    <span className="w-14 text-right text-sm tabular-nums text-muted-foreground">{signatureOffsetY}px</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="w-28 shrink-0 text-sm">Rotation</label>
                                    <input
                                        type="range"
                                        min={-45}
                                        max={45}
                                        step={1}
                                        className="flex-1 accent-primary"
                                        {...form.register('signatureRotation', { valueAsNumber: true })}
                                    />
                                    <span className="w-14 text-right text-sm tabular-nums text-muted-foreground">{signatureRotation}°</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="w-28 shrink-0 text-sm">Scale</label>
                                    <input
                                        type="range"
                                        min={0.5}
                                        max={2}
                                        step={0.05}
                                        className="flex-1 accent-primary"
                                        {...form.register('signatureScale', { valueAsNumber: true })}
                                    />
                                    <span className="w-14 text-right text-sm tabular-nums text-muted-foreground">{Math.round(signatureScale * 100)}%</span>
                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="px-2 text-muted-foreground"
                                    onClick={() => {
                                        form.setValue('signatureOffsetX', 0);
                                        form.setValue('signatureOffsetY', 0);
                                        form.setValue('signatureRotation', 0);
                                        form.setValue('signatureScale', 1);
                                    }}
                                >
                                    Reset position
                                </Button>
                            </div>
                        </details>
                    )}
                </FormContainer>

                <FormContainer heading="Additional Info">
                    <FormRow>
                        <FormField
                            control={form.control}
                            name="disclaimer"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Disclaimer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="I declare that..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Optional
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormRow>
                </FormContainer>
            </form>
        </Form>
    );
};
