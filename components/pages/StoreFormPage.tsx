"use client"

import React from 'react';
import MultiStepFormHeader from "@/components/MultiStepFormHeader";
import {FormHeaderLabel} from "@/types";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "../ui/card";
import {ZodUserShopDetailsFormSchema} from "@/zod/formValidation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod"
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const formHeaderLabels: FormHeaderLabel[] = [
    {
        id: 1,
        title: "Store Information",
    },
    {
        id: 2,
        title: "Store Location",
    },
    {
        id: 3,
        title: "Store Contact",
    }
]

const StoreFormPage = () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    }

    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
    }

    const form = useForm<z.infer<typeof ZodUserShopDetailsFormSchema>>({
        resolver: zodResolver(ZodUserShopDetailsFormSchema),
        defaultValues:{
            // Store Information
            storeName: "",
            businessType: "",
            storeDescription: "",
            openingDate: "",
            storeLogo: "",
            businessHours: "",
            status: "Active" || "Inactive" || "Under Maintenance",
            storeLicenseNumber: "",
            taxIdNumber: "",
            // Store Location
            streetAddress: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            latitude: 0,
            longitude: 0,
            storefrontType: "Online" || "Physical" || "Both",
            // Store Contact
            contactName: "",
            contactEmail: "",
            phoneNumber: "",
            alternatePhoneNumber: "",
            faxNumber: "",
            websiteUrl: "",
            customerServiceContact: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof ZodUserShopDetailsFormSchema>) => {
        console.log(values);
    };

    return (
        <section className="container p-5">
            <MultiStepFormHeader formHeaderLabel={formHeaderLabels} currentStep={currentStep}/>
            <Card className="max-w-[800px] mx-auto">
                <CardHeader className="text-pretty text-center font-semibold">Provide Your Sore Information</CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {
                                currentStep === 0 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="storeName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Store Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="example name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }
                            {
                                currentStep === 1 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="streetAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>StreetAddress</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="01, some street" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }
                            {
                                currentStep === 2 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="contactName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ContactName</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="jhone doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }
                            {
                                currentStep === formHeaderLabels.length - 1 && (
                                    <div className="w-full flex justify-end items-end">
                                    <Button
                                        type="submit">Submit</Button>
                                    </div>
                                )
                            }
                        </form>
                    </Form>

                </CardContent>
                <CardFooter>
                    <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
                        <Button
                            type={"button"}
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                        >
                            Prev</Button>
                        <div className="flex justify-center items-center gap-3">
                            <Button
                                type={"button"}
                                onClick={handleNext}
                                disabled={currentStep === formHeaderLabels.length - 1}
                            >
                                Next
                            </Button>
                        </div>

                    </div>
                </CardFooter>
            </Card>
        </section>
    );
};

export default StoreFormPage;