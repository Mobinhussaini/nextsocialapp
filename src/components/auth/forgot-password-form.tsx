"use client";

// React hooks;
import { useState, useTransition } from "react";

// validation schema and other libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// SERVER Components imported here;

// SHADCN imported here;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Builted components imported here;
import CardWrapper from "@/components/reusable/card-wrapper";
import { FormSuccess } from "@/components/reusable/form-success";
import { FormError } from "@/components/reusable/form-error";
// import { ResetPassword } from "@/actions/reset-password";
import { ScaleLoader } from "react-spinners";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      // console.log(values); 
    //   ResetPassword(values)
    //     .then((data) => {
    //       setSuccess(data?.success);
    //       setError(data?.error);
    //     })
    //     .catch(() => {
    //       setSuccess("");
    //       setError("Something went wrong. Please try again.");
    //     });
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset Your Password"
      backButtonLabel="Back to Login"
      backButtonPath="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && <FormError message={error} size="xs" />}
          {success && <FormSuccess message={success} />}
          <Button type="submit" disabled={isPending} className="w-full -mt-6">
            {isPending ? (
              <ScaleLoader color="red" height={12} width={3} />
            ) : (
              <>Reset Password</>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
