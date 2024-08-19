import z from "zod";
import {ZodSignUpFromSchema} from "../zod/formValidation";
import {toast} from "sonner";

const fetchFunction = async (values: z.infer<typeof ZodSignUpFromSchema>) => {
    fetch("/api/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message || "Account created successfully");
                // form.reset();
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "An error occurred");
            }
        })
        .catch((error) => {
            toast.error("An error occurred");
        });
}