"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { determineValidationSchema, handleSignUp } from "@/lib";
import { SignUpEmailBox } from "./SignUpEmailBox";
import { SignUpPasswordBox } from "./SignUpPasswordBox";
import { useRouter } from "next/navigation";

export const Signup = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: determineValidationSchema(currentStep),
    onSubmit: async (values) => {
      if (currentStep === 1) {
        try {
          setLoading(true);
          const { email, password } = values;
          const data = await handleSignUp({ email, password });

          if (data) {
            localStorage.setItem("token", data.accessToken || data.token);

            push("/confirm-mail");
          }
        } catch (error) {
          console.error("Бүртгэл хийхэд алдаа гарлаа:", error);
        } finally {
          setLoading(false);
        }
      } else {
        handleNext();
      }
    },
  });

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (!errors.email && formik.values.email !== "") {
      setCurrentStep(1);
    } else {
      formik.setFieldTouched("email", true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(0);
  };

  const emailBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleNext: handleNext,
  };

  const passwordBoxProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleCreateAccount: formik.handleSubmit,
    handleBack: handlePrevious,
    isLoading: loading,
  };

  const StepComponents = [
    <SignUpEmailBox key={0} {...emailBoxProps} />,
    <SignUpPasswordBox key={1} {...passwordBoxProps} />,
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      {StepComponents[currentStep]}
    </div>
  );
};
