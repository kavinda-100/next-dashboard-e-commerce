import { baseApi } from "./baseApi";
import {mutationReturnType} from "@/types";
import {ZodSignUpFormType} from "@/zod/formValidation";

export const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<mutationReturnType, ZodSignUpFormType>({
            query: (body) => ({
                url: "/sign-up",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useRegisterMutation } = registerApi;