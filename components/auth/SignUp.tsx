"use client"

import React from 'react';
import CardWrapper from "@/components/CardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod"
import {ZodSignUpFromSchema} from "@/zod/formValidation";
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
import { toast } from "sonner"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useRegisterMutation} from "@/store/api/registerApi";
import FormSuccess from "@/components/FormSuccess";
import FormError from "@/components/FormError";

const SignUp = () => {
    const router = useRouter();
    const [ register, { isLoading} ] = useRegisterMutation();
    const [isSuccess, setIsSuccess] = React.useState<string | undefined>("");
    const [isError, setIsError] = React.useState<string | undefined>("");

    const form = useForm<z.infer<typeof ZodSignUpFromSchema>>({
        resolver: zodResolver(ZodSignUpFromSchema),
        defaultValues:{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof ZodSignUpFromSchema>) => {
        try {
            const result = await register(values).unwrap(); // Await and unwrap RTK query response
            toast.success(result.message || "Account created successfully");
            setIsSuccess(result.message);
            form.reset();
            router.push("/store-form")
        }
        catch (err: any | Error) {
            // console.log(err);
            setIsError( err.data.message || "An error occurred");
            toast.error(err.data.message  || "An error occurred");
        }
    };

    return (
        <section className="flex justify-center items-center">
           <CardWrapper
               headerLabel="Sign Up"
               subHeaderLabel="welcome 😊 create an account."
               showBackButton={true}
                backButtonLabel="Back to Sign In"
                backButtonHref="/sign-in"
                showSocialMedia={true}
                cardWidth="w-[500px]"
           >
               <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                       <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-3 ">
                           <FormField
                               control={form.control}
                               name="firstName"
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>First Name</FormLabel>
                                       <FormControl>
                                           <Input
                                               disabled={isLoading}
                                               placeholder="Jhone" {...field} />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                           />
                           <FormField
                               control={form.control}
                               name="lastName"
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Last Name</FormLabel>
                                       <FormControl>
                                           <Input
                                               disabled={isLoading}
                                               placeholder="Doe" {...field} />
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                           />
                       </div>
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
                       <FormField
                           control={form.control}
                           name="confirmPassword"
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel>Confirm Password</FormLabel>
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
                           <p className="font-light text-sm">already have an account?</p>
                           <Link href="/sign-in" className="font-light text-sm hover:underline">Sign In</Link>
                       </div>
                       {
                            isSuccess && <FormSuccess message={isSuccess}/>
                       }
                       {
                            isError && <FormError message={isError}/>
                       }
                       <Button type="submit" className="w-full" disabled={isLoading}>Sign Up</Button>
                   </form>
               </Form>

           </CardWrapper>
        </section>
    );
};

export default SignUp;