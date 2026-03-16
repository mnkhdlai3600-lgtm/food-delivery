"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { DynamicCardHeader } from "@/components/card";
import { LoginFooter } from "./LoginFooter";
import { FooterButtons } from "@/components/auth";
import { loginInitialValues } from "@/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(main)/context";

export const Login = () => {
  const { push } = useRouter();
  const { login } = useContext(UserContext);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError("");

        localStorage.setItem("savedEmail", values.email);

        await login(values.email, values.password);
      } catch (error: any) {
        setSubmitError(error.message || "Нэвтрэхэд алдаа гарлаа");
      }
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
      formik.setFieldValue("email", savedEmail);
    }
  }, []);

  const formErrorPassword = formik.touched.password && formik.errors.password;
  const formErrorEmail = formik.touched.email && formik.errors.email;

  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: formik.values.email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError("");
      formik.handleChange(e);
    },
    onBlur: formik.handleBlur,
    inputError: formErrorEmail,
    inputErrorMessage: formik.errors.email,
  };

  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    type: "password",
    value: formik.values.password,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError("");
      formik.handleChange(e);
    },
    onBlur: formik.handleBlur,
    inputError: formErrorPassword,
    inputErrorMessage: formik.errors.password,
  };

  const hasInputError = !!formik.errors.email || !!formik.errors.password;
  const isInputEmpty = !formik.values.email;
  const isPasswordEmpty = !formik.values.password;

  const isButtonDisabled = [hasInputError, isInputEmpty, isPasswordEmpty].some(
    Boolean,
  );

  const navigateToForgotPassword = () => {
    push("/forgot-password");
  };

  return (
    <Card className="flex w-full max-w-[440px] flex-col gap-7 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid w-full items-start gap-4">
            <FormInput {...emailInputProps} />
            <FormInput {...passwordInputProps} />

            <Button
              type="button"
              variant="link"
              className="ml-auto h-auto w-fit p-0 text-sm font-medium text-[#2563EB] underline-offset-4 hover:underline"
              onClick={navigateToForgotPassword}
            >
              Forgot password?
            </Button>
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

      <LoginFooter />
    </Card>
  );
};
