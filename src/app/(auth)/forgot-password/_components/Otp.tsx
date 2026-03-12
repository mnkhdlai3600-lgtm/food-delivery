"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { handleVerifyOtp } from "@/lib";
import { RefreshCwIcon, Loader2 } from "lucide-react";

interface InputOTPFormProps {
  email: string;
  onSuccess: () => void;
}

export function InputOTPForm({ email, onSuccess }: InputOTPFormProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmOTP = async () => {
    if (otp.length !== 6) return;
    setErrorMessage(null);

    try {
      setIsLoading(true);
      await handleVerifyOtp(email, otp);
      onSuccess();
    } catch (error: any) {
      console.error("OTP Error:", error);
      setErrorMessage(error.message || "OTP баталгаажуулахад алдаа гарлаа.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to:{" "}
          <span className="font-medium text-black">{email}</span>.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Field className="space-y-4">
          <div className="flex items-center justify-between">
            <FieldLabel>Verification code</FieldLabel>
            <Button variant="outline" size="sm" className="gap-2" type="button">
              <RefreshCwIcon className="w-4 h-4" />
              Resend
            </Button>
          </div>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(val) => {
              setOtp(val);
              if (errorMessage) setErrorMessage(null);
            }}
            disabled={isLoading}
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-14 text-xl border-2 rounded-xl"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator className="mx-1" />
            <InputOTPGroup className="gap-2">
              {[3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-14 text-xl border-2 rounded-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {errorMessage && (
            <p className="text-sm font-medium text-red-500 mt-2">
              {errorMessage}
            </p>
          )}

          <FieldDescription>
            <a href="#" className="hover:underline">
              I no longer have access to this email.
            </a>
          </FieldDescription>
        </Field>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="button"
          className="w-full bg-black hover:bg-gray-800 text-white py-6 rounded-xl text-lg"
          onClick={handleConfirmOTP}
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Verify"}
        </Button>
      </CardFooter>
    </Card>
  );
}
