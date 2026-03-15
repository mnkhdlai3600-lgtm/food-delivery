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
import ResetPassword from "./ResetPassword";

export const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [resetToken, setResetToken] = useState<string>("");
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: determineValidationSchema(currentStep),
    onSubmit: async (values) => {
      try {
        setSubmitError("");
        await handleSendPasswordResetRequest(values);
        setCurrentStep(1);
      } catch (error: any) {
        setSubmitError(error.message || "Error sending reset request");
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
          handleChange={(e) => {
            setSubmitError("");
            formik.handleChange(e);
          }}
          handleBlur={formik.handleBlur}
          handleSubmit={formik.handleSubmit}
          submitError={submitError}
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
            if (token) setResetToken(token);
            setCurrentStep(3);
          }}
        />
      )}

      {currentStep === 3 && <ResetPassword token={resetToken} />}
    </>
  );
};
