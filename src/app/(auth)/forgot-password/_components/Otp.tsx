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
  onSuccess: (token?: string) => void;
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
      const data = await handleVerifyOtp(email, otp);
      onSuccess(data?.token);
    } catch (error: any) {
      setErrorMessage(error.message || "OTP баталгаажуулахад алдаа гарлаа.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-[440px] rounded-[32px] border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
      <CardHeader className="space-y-3 px-6 pt-6">
        <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
          Verify your login
        </CardTitle>
        <CardDescription className="text-base leading-7 text-slate-500">
          Enter the verification code we sent to:{" "}
          <span className="font-semibold text-slate-900">{email}</span>.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-2">
        <Field className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <FieldLabel className="text-sm font-medium text-slate-700">
              Verification code
            </FieldLabel>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-xl border-slate-200 bg-white px-4 text-slate-700 hover:bg-slate-50"
              type="button"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Resend
            </Button>
          </div>

          <div className="flex justify-center">
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
                    className="h-14 w-12 rounded-2xl border border-slate-200 bg-slate-50 text-xl font-semibold text-slate-900"
                  />
                ))}
              </InputOTPGroup>

              <InputOTPSeparator className="mx-2 text-slate-400" />

              <InputOTPGroup className="gap-2">
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-14 w-12 rounded-2xl border border-slate-200 bg-slate-50 text-xl font-semibold text-slate-900"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          <FieldDescription className="text-center text-sm text-slate-500">
            <a href="#" className="font-medium text-blue-600 hover:underline">
              I no longer have access to this email.
            </a>
          </FieldDescription>
        </Field>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 px-6 pb-6 pt-2">
        <Button
          type="button"
          className="h-14 w-full rounded-2xl bg-black text-base font-semibold text-white hover:bg-gray-800"
          onClick={handleConfirmOTP}
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            "Verify"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
