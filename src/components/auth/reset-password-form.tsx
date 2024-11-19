"use client";

// React hooks;
import { useState, useTransition } from "react";

// validation schema and other libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// SERVER Components imported here;
// import { NewPassword } from "@/actions/new-password";

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
import { ScaleLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {

    // const searchParams = useSearchParams(); 
    // const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      // console.log(values); 

    //   NewPassword(values, token)
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

  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassworShow = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <CardWrapper
      headerLabel="Change Your Password"
      backButtonLabel="Back to Login"
      backButtonPath="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center justify-between">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                        placeholder="********"
                      />
                      <div
                        onClick={handleShowPassword}
                        className="cursor-pointer"
                      >
                        {showPassword && (
                          <FaEye size={16} className="-ml-6 text-gray-600 " />
                        )}
                        {!showPassword && (
                          <FaEyeSlash
                            size={16}
                            className="-ml-6 text-gray-600 "
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center justify-between">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={isPending}
                        placeholder="********"
                      />
                      <div
                        onClick={handleConfirmPassworShow}
                        className="cursor-pointer"
                      >
                        {showConfirmPassword && (
                          <FaEye size={16} className="-ml-6 text-gray-600 " />
                        )}
                        {!showConfirmPassword && (
                          <FaEyeSlash
                            size={16}
                            className="-ml-6 text-gray-600 "
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button type="submit" disabled={isPending} className="w-full -mt-6">
            {isPending ? (
              <ScaleLoader color="red" height={12} width={3} />
            ) : (
              <>Save New Password</>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
