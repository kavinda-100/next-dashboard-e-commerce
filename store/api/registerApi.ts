import { baseApi } from "./baseApi";
import {mutationReturnType} from "@/types";
import {ZodSignUpFormType, ZodSignInFormType} from "@/zod/formValidation";

export const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<mutationReturnType, ZodSignUpFormType>({
            query: (body) => ({
                url: "/sign-up",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<mutationReturnType, ZodSignInFormType>({
           query: (body) => ({
                url: "/sign-in",
                method: "POST",
                body,
           }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = registerApi;