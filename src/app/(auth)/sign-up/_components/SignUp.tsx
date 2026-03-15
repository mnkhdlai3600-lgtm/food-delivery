"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { determineValidationSchema, handleSignUp } from "@/lib";

import { SignUpPasswordBox } from "./SignUpPasswordBox";
import { useRouter } from "next/navigation";
import { signUpInitialValues } from "@/constants/auth";
import { SignUpEmailBox } from "./SignUpEmailBox";

export const Signup = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: determineValidationSchema(currentStep),
    onSubmit: async (values) => {
      if (currentStep !== 1) return;

      try {
        setLoading(true);
        setSubmitError("");

        const { email, password } = values;
        const data = await handleSignUp({ email, password });

        if (data) {
          localStorage.setItem("savedEmail", email);
          push("/confirm-mail");
        }
      } catch (error: any) {
        setSubmitError(error.message || "Бүртгэл хийхэд алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleNext = async () => {
    const errors = await formik.validateForm();

    if (!errors.email && formik.values.email.trim() !== "") {
      setCurrentStep(1);
      return;
    }

    formik.setFieldTouched("email", true);
  };

  const handlePrevious = () => {
    setSubmitError("");
    setCurrentStep(0);
  };

  const emailBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError("");
      formik.handleChange(e);
    },
    handleBlur: formik.handleBlur,
    handleNext,
  };

  const passwordBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError("");
      formik.handleChange(e);
    },
    handleBlur: formik.handleBlur,
    handleCreateAccount: formik.handleSubmit,
    handleBack: handlePrevious,
    isLoading: loading,
    submitError,
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {currentStep === 0 ? (
        <SignUpEmailBox {...emailBoxProps} />
      ) : (
        <SignUpPasswordBox {...passwordBoxProps} />
      )}
    </div>
  );
};
