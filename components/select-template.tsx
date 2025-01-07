import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { FormContainer } from "@/components/form-container";
import { ReactHookFormValue } from "@/types/globals";

export const SelectTemplate: FC<ReactHookFormValue> = ({ form }) => {
    return (
        <FormContainer heading="Templates" className="print:hidden">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                        <FormItem className="space-y-3 pt-4">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid-cols-3"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="1" id="template1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Template 1
                                        </FormLabel>
                                    </FormItem>

                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="2" id="template2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Template 2
                                        </FormLabel>
                                    </FormItem>

                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="3" id="template3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Template 3
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </FormContainer>
    );
};
