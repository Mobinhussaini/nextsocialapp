"use client";

import { useState, useTransition } from "react";

// validation schema and other libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";

// SHADCN components imported here;
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

// import { register } from "@/actions/register"
;
// Builted components imported here;
import CardWrapper from "@/components/reusable/card-wrapper";
import { FormSuccess } from "@/components/reusable/form-success";
import { FormError } from "@/components/reusable/form-error";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import SocialSeperator from "@/components/reusable/social-seperator";
import { ScaleLoader } from "react-spinners";

const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {

        // console.log(values); 
    //   register(values)
    //     .then((data) => {
    //       setSuccess(data.success);
    //       setError(data.error);
    //     })
    //     .catch((error) => {
    //       setError(error.message);
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
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonPath="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      placeholder="john.doe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
                  <FormLabel>Confirm Password</FormLabel>
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
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
          <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
              <ScaleLoader color="red" height={12} width={3}  />
            ) : (
              <>Register</>
            )}
          </Button>
        </form>
        <div className="mt-6 -mb-6">
          <SocialSeperator />
        </div>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;