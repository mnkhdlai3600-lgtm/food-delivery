"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { FormInput } from "../../../../components/dynamic-inputs";
import { SignUpFooter } from "./SignUpFooter";
import { DynamicCardHeader } from "@/components/card";
import { BackButton } from "@/components/button";
import { FooterButtons } from "@/components/auth";

type PasswordBoxProps = {
  values: { password: string; passwordConfirmation: string };
  errors: { password?: string; passwordConfirmation?: string };
  touched: { password?: boolean; passwordConfirmation?: boolean };
  handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  handleCreateAccount: (_e?: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
  isLoading: boolean;
  submitError: string;
};

export const SignUpPasswordBox = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleCreateAccount,
  handleBack,
  isLoading,
  submitError,
}: PasswordBoxProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const formErrorPassword = touched.password && errors.password;
  const formErrorPasswordConfirmation =
    touched.passwordConfirmation && errors.passwordConfirmation;

  const showPass = isShowPassword ? "text" : "password";

  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    type: showPass,
    value: values.password,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formErrorPassword,
    inputErrorMessage: errors.password,
  };

  const passwordConfirmationProps = {
    name: "passwordConfirmation",
    placeholder: "Confirm",
    type: showPass,
    value: values.passwordConfirmation,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formErrorPasswordConfirmation,
    inputErrorMessage: errors.passwordConfirmation,
  };

  const buttonDisable =
    !!errors.password ||
    !!errors.passwordConfirmation ||
    !values.password ||
    !values.passwordConfirmation ||
    isLoading;

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <Card className="flex w-full max-w-[440px] flex-col gap-7 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
      <BackButton handleClick={handleBack} />

      <DynamicCardHeader
        title="Create a strong password"
        description="Create a strong password with letters, numbers."
      />

      <CardContent className="p-0">
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-6">
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col gap-4">
              <FormInput {...passwordInputProps} />
              <FormInput {...passwordConfirmationProps} />

              <div className="flex items-center space-x-2 rounded-xl bg-slate-50 px-3 py-3">
                <Checkbox id="showPass" onCheckedChange={handleShowPassword} />
                <label
                  htmlFor="showPass"
                  className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>
            </div>
          </div>

          {submitError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {submitError}
            </div>
          )}

          <FooterButtons
            buttonDisable={buttonDisable}
            buttonText={isLoading ? "Creating..." : "Let`s Go"}
          />
        </form>
      </CardContent>

      <SignUpFooter />
    </Card>
  );
};
