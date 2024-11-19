"use server";

// Validation schema and other libraries;
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.emailVerified) {
      const userAccount = await db.account.findFirst({
        where: {
          userId: existingUser.id,
        },
      });
      if (userAccount)
        return {
          error: `This account created by ${userAccount.provider}, please click the bellow ${userAccount.provider} button to sign in!`,
        };
    }

    if (!existingUser || !existingUser.email || !existingUser.password)
      return { error: "Invalid Credentails!" };

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return {
        success:
          "Please confirm your email, the verification link has been sent!",
      };
    }

    // if (existingUser.isTwoFactorEnabled && existingUser.email) {
    //   console.log("CODE ", code);
    //   if (code) {
    //     const getTwoFactorCode = await db.twoFactorToken.findUnique({
    //       where: {
    //         token: code,
    //       },
    //     });

    //     if (!getTwoFactorCode) {
    //       return { error: "2FA is missing" };
    //     }

    //     if (getTwoFactorCode.expires < new Date())
    //       return { error: "2FA code is expired!" };
    //     console.log(
    //       "GET CODE FROM TwoFactorToken TABLE ",
    //       getTwoFactorCode.token
    //     );
    //     console.log("GET ID FROM TwoFactorToken TABLE ", getTwoFactorCode.id);
    //     console.log(
    //       "GET EXISTING ID FROM TwoFactorToken TABLE ",
    //       existingUser.id
    //     );

    //     await db.twoFactorConfirmation.create({
    //       data: {
    //         userId: existingUser.id,
    //         token: code,
    //       },
    //     });
    //   }
    // } else {
    //   const twFactorToken = await generateTwoFactorToken(existingUser.email);
    //   await sendTwoFactorTokenEmail(existingUser.email, twFactorToken.token);
    //   return { twoFactor: true };
    // }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Welcome back😍" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Unknown error" };
      }
    }
    throw error;
  }
};
