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
    // Store Information
    storeName: z
        .string()
        .min(2, { message: "Store name must be at least 2 characters long." })
        .max(100, { message: "Store name must be less than 100 characters." }),

    businessType: z
        .string()
        .min(3, { message: "Please select a valid business type." }),

    storeDescription: z
        .string()
        .max(500, { message: "Store description must be less than 500 characters." })
        .optional(),

    openingDate: z
        .date(),

    businessHours: z
        .string()
        .optional(), // You can create a more advanced validation based on the format of business hours

    status: z
        .enum(['Active', 'Inactive', 'Under Maintenance'], { message: "Please select a valid status." }),

    storeLicenseNumber: z
        .string()
        .min(5, { message: "Store license number must be at least 5 characters long." })
        .optional(),

    taxIdNumber: z
        .string()
        .regex(/^[0-9]+$/, { message: "Tax ID Number must only contain numbers." })
        .optional(),

    // Store Location
    streetAddress: z
        .string()
        .min(5, { message: "Street address must be at least 5 characters long." }),

    city: z
        .string()
        .min(2, { message: "City name must be at least 2 characters long." }),

    state: z
        .string()
        .min(2, { message: "State/Province must be at least 2 characters long." }),

    postalCode: z
        .string()
        .regex(/^\d{5}(-\d{4})?$/, { message: "Postal Code must be a valid format (e.g., 12345 or 12345-6789)." }),

    country: z
        .string()
        .min(2, { message: "Country must be at least 2 characters long." }),

    latitude: z
        .string()
        .refine((val) => Number(val) >= -90 && Number(val) <= 90, { message: "Latitude must be between -90 and 90." })
        .optional(),

    longitude: z
        .string()
        .refine((val) => Number(val) >= -180 && Number(val) <= 180, { message: "Longitude must be between -180 and 180." })
        .optional(),

    storefrontType: z
        .enum(['Physical', 'Warehouse', 'Online'], { message: "Please select a valid storefront type." }),

    // Store Contact Information
    contactName: z
        .string()
        .min(2, { message: "Contact name must be at least 2 characters long." }),

    contactEmail: z
        .string()
        .email({ message: "Please enter a valid email address." }),

    phoneNumber: z
        .string(),

    alternatePhoneNumber: z
        .string()
        .optional(),

    faxNumber: z
        .string()
        .optional(),

    websiteUrl: z
        .string()
        .url({ message: "Please provide a valid website URL." })
        .optional(),

    customerServiceContact: z
        .string()
        .min(2, { message: "Customer service contact name must be at least 2 characters long." })
        .optional(),
});

// Example usage
export type ZodUserShopDetailsFormType = z.infer<typeof ZodUserShopDetailsFormSchema>;
