"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DynamicCardHeader } from "@/components/card";
import { BackButton } from "@/components/button";
import { FooterButtons } from "@/components/auth";
import { handleSendPasswordResetRequest } from "@/lib";
import { useState } from "react";

type ConfirmEmailProps = {
  email: string;
  handlePrevious: () => void;
  handleNext: () => void;
};

export const ConfirmEmail = ({
  email,
  handlePrevious,
  handleNext,
}: ConfirmEmailProps) => {
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    try {
      setLoading(true);

      await handleSendPasswordResetRequest({ email });

      handleNext();
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <BackButton handleClick={handlePrevious} />

      <div>
        <DynamicCardHeader title="Please verify Your Email" />
        <p className="text-muted-foreground">
          We just sent an email to <span className="text-primary">{email}</span>
          . Click the link in the email to verify your account.
        </p>
      </div>

      <CardContent className="p-0 h-fit">
        <FooterButtons
          buttonText={loading ? "Sending..." : "Continue"}
          buttonDisable={loading}
          handleClick={handleContinue} // ✅ НЭГ Л CLICK PROP
        />
      </CardContent>
    </Card>
  );
};
