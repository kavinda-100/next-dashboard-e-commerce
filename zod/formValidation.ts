import z from "zod"

export const ZodSignInFromSchema = z.object({
    email: z.string({message: "Email is required"}).email({ message: "Please enter a valid email address" }),
    password: z.string({message: "Password is required"}).min(6, { message: "Password must be at least 6 characters long" }),
})

export type ZodSignInFormType = z.infer<typeof ZodSignInFromSchema>

export const ZodSignUpFromSchema = z.object({
    firstName: z.string({message: "First Name is required"}).min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z.string({message: "Last Name is required"}).min(2, { message: "Last name must be at least 2 characters long" }),
    email: z.string({message: "Email is required"}).email({ message: "Please enter a valid email address" }),
    password: z.string({message: "Password is required"}).min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string({message: "Confirm Password is required"}).min(6, { message: "Password must be at least 6 characters long" }),
})
    .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type ZodSignUpFormType = z.infer<typeof ZodSignUpFromSchema>

export const ZodUserShopDetailsFormSchema = z.object({
    shopName: z.string().min(2, { message: "Shop name must be at least 2 characters long" }),
})