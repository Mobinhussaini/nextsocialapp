"use client";

// React hooks;
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

// validation schema and other libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// SERVER Components imported here;
import { login } from "@/actions/login";

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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialSeperator from "@/components/reusable/social-seperator";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This Email already in use with another provider account like Google & ...., please login through that!"
      : "";

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  // const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");
      // console.log(values); 
      login(values)
        .then((data) => {
          if(data?.error){
            form.reset();
            setError(data?.error);
          }
          if(data?.success){
            form.reset();
            setSuccess(data?.success);
          }
          if(data?.code){
            // console.log("DATA: ",data); 
            // setShowTwoFactor(true);

          }
        })
        .catch(() => {
          setError("Something went wrong. Please try again.");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonPath="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* {!showTwoFactor && 
              (
              <> */}
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row justify-between items-center">
                      <Input
                        {...field}
                        disabled={isPending}
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                      />
                      <div onClick={handleShowPassword}>
                        {showPassword && (
                          <FaEye
                            size={16}
                            className="cursor-pointer text-gray-600 -ml-6"
                          />
                        )}
                        {!showPassword && (
                          <FaEyeSlash
                            size={16}
                            className="cursor-pointer text-gray-600 -ml-6"
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* </>
          )}
          { showTwoFactor &&(
            <>
              <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2FA CODE</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="123456"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </>
          )

          } */}
            <Button
              variant="link"
              className="font-normal px-0 hover:text-blue-600 "
              size="sm"
              asChild
            >
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </Button>
          </div>

          {error && <FormError message={error} />}
          {urlError && <FormError message={urlError} size="xs" />}
          {success && <FormSuccess message={success} />}
          <Button type="submit" disabled={isPending} className="w-full -mt-6">
          {isPending ? (
              <ScaleLoader color="red" height={12} width={3}  />
            ) : (
            //   <>{showTwoFactor ? "Verify" : "Sign In"}</>
            <>Sign In</>
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

export default LoginForm;
