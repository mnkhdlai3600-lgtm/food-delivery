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
    <Card className="flex w-[416px] flex-col gap-6 border-none shadow-none">
      <BackButton handleClick={handleBack} />

      <DynamicCardHeader
        title="Create a strong password"
        description="Create a strong password with letters, numbers."
      />

      <CardContent className="p-0">
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-6">
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col gap-4 space-y-1.5">
              <FormInput {...passwordInputProps} />
              <FormInput {...passwordConfirmationProps} />

              <div className="flex items-center space-x-2">
                <Checkbox id="showPass" onCheckedChange={handleShowPassword} />
                <label
                  htmlFor="showPass"
                  className="text-muted-foreground text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>
            </div>
          </div>

          {submitError && (
            <p className="text-sm font-medium text-red-500">{submitError}</p>
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
