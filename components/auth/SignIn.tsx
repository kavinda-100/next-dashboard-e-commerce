"use client"

import React from 'react';
import CardWrapper from "@/components/CardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod"
import {ZodSignInFromSchema} from "@/zod/formValidation";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";

const SignIn = () => {
    const form = useForm<z.infer<typeof ZodSignInFromSchema>>({
        resolver: zodResolver(ZodSignInFromSchema),
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ZodSignInFromSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section className="flex justify-center items-center">
            <CardWrapper
                headerLabel="Sign In"
                subHeaderLabel="Sign in to your account. 🔑"
                showBackButton={true}
                backButtonLabel="Back to Sign Up"
                backButtonHref="/sign-up"
                showSocialMedia={true}
                cardWidth="w-[500px]"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="JhoneDoe@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-start items-center gap-2">
                            <p className="font-light text-sm">do not have an account?</p>
                            <Link href="/sign-up" className="font-light text-sm hover:underline">Sign Up</Link>
                        </div>
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                </Form>

            </CardWrapper>
        </section>
    );
};

export default SignIn;