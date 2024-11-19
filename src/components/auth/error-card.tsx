import React from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/reusable/header";
import { BackButton } from "@/components/reusable/back-button";

const AuthErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" color="red" size="xl" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};

export default AuthErrorCard;
