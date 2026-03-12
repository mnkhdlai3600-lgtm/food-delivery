"use client";

import { useState } from "react";
import { useFormik } from "formik";
import {
  determineValidationSchema,
  handleSendPasswordResetRequest,
} from "@/lib";
import { ForgotPasswordEmailCard } from "./ForgotPasswordEmailCard";
import { ConfirmEmail } from "./ConfirmEmail";
import { InputOTPForm } from "./Otp";
import ResetPassword from "./ResetPassword"; // Шинэ компонент

export const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  // OTP-оос ирэх token-ийг хадгалах (хэрэв backend token буцаадаг бол)
  const [resetToken, setResetToken] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: determineValidationSchema(currentStep),
    onSubmit: async (values) => {
      try {
        await handleSendPasswordResetRequest(values);
        setCurrentStep(1);
      } catch (error) {
        console.error("Error sending reset request:", error);
      }
    },
  });

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      {currentStep === 0 && (
        <ForgotPasswordEmailCard
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          handleSubmit={formik.handleSubmit}
        />
      )}

      {currentStep === 1 && (
        <ConfirmEmail
          email={formik.values.email}
          handlePrevious={handlePrevious}
          handleNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <InputOTPForm
          email={formik.values.email}
          onSuccess={(token?: string) => {
            if (token) setResetToken(token); // Backend-ээс token ирвэл хадгална
            setCurrentStep(3); // ✅ OTP амжилттай бол 3-р алхам руу
          }}
        />
      )}

      {currentStep === 3 && (
        <ResetPassword token={resetToken} email={formik.values.email} />
      )}
    </>
  );
};
