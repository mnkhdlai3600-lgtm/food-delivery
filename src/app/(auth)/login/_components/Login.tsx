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
    <Card className="flex w-[416px] flex-col gap-6 border-none shadow-none">
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
              className="w-fit p-0 underline"
              onClick={navigateToForgotPassword}
            >
              Forgot password ?
            </Button>
          </div>

          {submitError && (
            <p className="text-sm font-medium text-red-500">{submitError}</p>
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
