"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "@/components/reusable/card-wrapper";
// import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
// import { newVerification } from "@/actions/new-verification";
// import { FormSuccess } from "@/components/reusable/form-success";
import { FormError } from "@/components/reusable/form-error";

const NewVerificationForm = () => {
//   const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token does not exist!");
      return;
    }

    // newVerification(token)
    //   .then((data) => {
    //     setSuccess(data?.success);
    //     setError(data?.error);
    //   })
    //   .catch(() => {
    //     setError("SOMETHING WENT WRONG!");
    //   });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm Your Email"
      backButtonLabel="Back to login"
      backButtonPath="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {/* { !success && !error && <BeatLoader color="green" />}
        { success && <FormSuccess message={success} />} */}
        { error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
