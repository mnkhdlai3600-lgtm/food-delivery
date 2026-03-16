"use client";

import { handlePasswordReset, passwordValidationSchema } from "@/lib";
import { useFormik } from "formik";
import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { FormInput } from "../../../../components/dynamic-inputs";
import { Checkbox } from "../../../../components/ui/checkbox";
import { DynamicCardHeader } from "@/components/card";
import { FooterButtons } from "@/components/auth";

export const PasswordResetBox = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const token = searchParams.get("token");

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError("");

        if (!token) {
          setSubmitError("Token олдсонгүй");
          return;
        }

        await handlePasswordReset({
          token,
          password: values.password,
        });

        push("/");
      } catch (error: any) {
        setSubmitError(error.message || "Нууц үг шинэчлэхэд алдаа гарлаа");
      }
    },
  });

  const formErrorPassword = formik.touched.password && formik.errors.password;
  const formErrorPasswordConfirmation =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  const showPass = isShowPassword ? "text" : "password";

  const hasPasswordError = !!formik.errors.password;
  const hasConfirmError = !!formik.errors.passwordConfirmation;
  const isPasswordEmpty = !formik.values.password;
  const isConfirmEmpty = !formik.values.passwordConfirmation;

  const isButtonDisabled = [
    hasPasswordError,
    hasConfirmError,
    isPasswordEmpty,
    isConfirmEmpty,
  ].some(Boolean);

  const handleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    type: showPass,
    value: formik.values.password,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError("");
      formik.handleChange(e);
    },
    onBlur: formik.handleBlur,
    inputError: formErrorPassword,
    inputErrorMessage: formik.errors.password,
  };

  const passwordConfirmationProps = {
    name: "passwordConfirmation",
    placeholder: "Confirm password",
    type: showPass,
    value: formik.values.passwordConfirmation,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError("");
      formik.handleChange(e);
    },
    onBlur: formik.handleBlur,
    inputError: formErrorPasswordConfirmation,
    inputErrorMessage: formik.errors.passwordConfirmation,
  };

  return (
    <Card className="flex w-full max-w-[440px] flex-col gap-7 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
      <DynamicCardHeader
        title="Create new password"
        description="Set a new password with a combination of letters and numbers for better security."
      />

      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
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
            buttonDisable={isButtonDisabled}
            buttonText="Let`s Go"
          />
        </form>
      </CardContent>
    </Card>
  );
};
