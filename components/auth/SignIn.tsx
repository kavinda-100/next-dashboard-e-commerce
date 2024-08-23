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
import {useRouter} from "next/navigation";
import {useLoginMutation} from "@/store/api/registerApi";
import FormSuccess from "@/components/FormSuccess";
import FormError from "@/components/FormError";
import {toast} from "sonner";

const SignIn = () => {
    const router = useRouter()
    const [login, {isLoading}] = useLoginMutation()
    const [isSuccess, setIsSuccess] = React.useState<string | undefined>("");
    const [isError, setIsError] = React.useState<string | undefined>("");

    const form = useForm<z.infer<typeof ZodSignInFromSchema>>({
        resolver: zodResolver(ZodSignInFromSchema),
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ZodSignInFromSchema>) {
        try {
            console.log(values)
            console.log("sending....")
            const result = await login(values).unwrap(); // Await and unwrap RTK query response//
            toast.success(result.message || "SignIn successfully");
            setIsSuccess(result.message);
            form.reset();
            router.push("/dashboard");
            console.log(result)
            console.log("done")
        } catch (err: any | Error) {
            console.log("error")
            console.log(err);
            setIsError(err.data?.message || "An error occurred");
            toast.error(err.data?.message || "An error occurred");
        }
    }

    return (
        <section className="flex justify-center items-center w-full h-screen">
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
                                        <Input
                                            disabled={isLoading}
                                            placeholder="JhoneDoe@gmail.com" {...field} />
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
                                        <Input
                                            disabled={isLoading}
                                            placeholder="*******" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-start items-center gap-2">
                            <p className="font-light text-sm">do not have an account?</p>
                            <Link href="/sign-up" className="font-light text-sm hover:underline">Sign Up</Link>
                        </div>
                        {isSuccess && <FormSuccess message={isSuccess}/>}
                        {isError && <FormError message={isError}/>}
                        <Button
                            disabled={isLoading}
                            type="submit" className="w-full">
                            {isLoading ? "SignIn..." : "Sign In"}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </section>
    );
};

export default SignIn;