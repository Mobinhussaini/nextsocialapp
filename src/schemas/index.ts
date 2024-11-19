import * as z from "zod";

/** START POINT OF THE --- POST --- SCHEMAS */
export const PostSchema = z.object({
  desc: z.string().min(3,{
    message: "Please add something to should be post publicaly!",
  }),
  img: z.optional(z.string()),
});


/** END OF THE --- POST --- SCHEMAS */
/** START POINT OF THE --- USER LOGIN & REGISTERATION --- SCHEMAS */

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(2, {
    message: "Password is required!",
  }),
  code: z.optional(z.string()),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});


export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password should be at least 6 characters long"
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password is required"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords didn't match!",
  path: ["confirmPassword"],
})

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters long"
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password is required"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords didn't match!",
  path: ["confirmPassword"],
})
 

/** END OF THE --- USER LOGIN & REGISTERATION --- SCHEMAS */