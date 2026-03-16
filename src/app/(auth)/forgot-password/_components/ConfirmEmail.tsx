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
    <Card className="flex w-full max-w-[440px] flex-col gap-7 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
      <BackButton handleClick={handlePrevious} />

      <div className="space-y-3">
        <DynamicCardHeader title="Please verify Your Email" />
        <p className="text-base leading-7 text-slate-500">
          We just sent an email to{" "}
          <span className="font-semibold text-slate-900">{email}</span>. Click
          the link in the email to verify your account.
        </p>
      </div>

      <CardContent className="p-0">
        <FooterButtons
          buttonText={loading ? "Sending..." : "Continue"}
          buttonDisable={loading}
          handleClick={handleContinue}
        />
      </CardContent>
    </Card>
  );
};
