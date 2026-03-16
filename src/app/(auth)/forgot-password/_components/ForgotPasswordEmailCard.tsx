"use client";

import { Card, CardContent } from "@/components/ui/card";
import { isEmailValid } from "@/lib";
import { FormInput } from "@/components/dynamic-inputs";
import { DynamicCardHeader } from "@/components/card";
import { LoginFooter } from "../../login/_components";
import { FooterButtons } from "@/components/auth";

type ForgotPasswordEmailCardProps = {
  values: { email: string };
  errors: { email?: string };
  touched: { email?: boolean };
  handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  submitError: string;
};

export const ForgotPasswordEmailCard = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  submitError,
}: ForgotPasswordEmailCardProps) => {
  const formError = touched.email && errors.email;

  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: values.email,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formError,
    inputErrorMessage: errors.email,
  };

  return (
    <Card className="flex w-full max-w-[440px] flex-col gap-7 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
      <DynamicCardHeader
        title="Reset your password"
        description="Enter your email to receive a password reset link."
      />

      <CardContent className="p-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-6"
        >
          <div className="grid items-center gap-4">
            <FormInput {...emailInputProps} />
          </div>

          {submitError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {submitError}
            </div>
          )}

          <FooterButtons
            buttonDisable={isEmailValid({ errors, values })}
            buttonText="Send link"
          />
        </form>
      </CardContent>

      <LoginFooter />
    </Card>
  );
};
