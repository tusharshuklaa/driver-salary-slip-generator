"use client";

import { FC, FormEvent } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormRow } from "@/components/form-row";
import { FormContainer } from "@/components/form-container";
import Currencies from "@/data/currency.json";

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
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        return;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            // Update the form state with the image URL
            form.setValue('signatureImageSrc', imageUrl);
        }
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
                                    <Popover>
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
                                                Currencies.map((currency: Currency, index) => {
                                                    const key = `${currency.value}__${index}`;
                                                    return (
                                                        <SelectItem key={key} value={key} aria-label={currency.text}>
                                                            {currency.text}
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

                <FormContainer heading="Signature">
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormContainer>
            </form>
        </Form>
    );
};