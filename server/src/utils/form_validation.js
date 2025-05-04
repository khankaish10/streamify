import { z } from 'zod'

export const loginValidationSchema = z.object({
    email: z.string()
        .email({ message: "Please enter a valid email." })
        .trim(),
    userName: z.string().optional(),
    password: z.string().min(1, { message: "Not be empty " })
        .min(8, { message: "Password must be atleast 8 characters long." })
        .trim()
})


export const signupValidationSchema = z.object({
    email: z.string()
        .email({ message: "Please enter a valid email." })
        .trim(),
    userName: z.string()
        .min(1, { message: "username must not be empty." }),
    password: z.string().min(1, { message: "Not be empty" })
        .min(8, { message: "Password must be atleast 8 characters long." })
        .trim(),
    fullName: z.string()
        .min(1, { message: "fullname must not be empty." }),
    avatar: z
        .any()
        .refine((file) => file !== null && file !== undefined, { message: "Avatar is required." }),
})