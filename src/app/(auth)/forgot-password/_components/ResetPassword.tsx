"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormik } from "formik";

import { handlePasswordReset, resetPasswordValidationSchema } from "@/lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword = ({ token }: ResetPasswordProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setSubmitError("");
        setSuccess("");

        if (!token) {
          setSubmitError("Token олдсонгүй.");
          return;
        }

        await handlePasswordReset({
          token,
          password: values.password,
        });

        setSuccess(
          "Нууц үг амжилттай шинэчлэгдлээ. Нэвтрэх хуудас руу шилжиж байна...",
        );

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err: any) {
        setSubmitError(err?.message || "Алдаа гарлаа");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const passwordError = formik.touched.password && formik.errors.password;
  const confirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

  const isButtonDisabled =
    !!formik.errors.password ||
    !!formik.errors.confirmPassword ||
    !formik.values.password ||
    !formik.values.confirmPassword ||
    isLoading;

  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold">
          Шинэ нууц үг тохируулах
        </CardTitle>
        <CardDescription>Шинэ нууц үгээ оруулна уу.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Шинэ нууц үг
            </label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={(e) => {
                  setSubmitError("");
                  setSuccess("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {passwordError && (
              <p className="text-sm font-medium text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Нууц үг давтах
            </label>

            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={(e) => {
                  setSubmitError("");
                  setSuccess("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {confirmPasswordError && (
              <p className="text-sm font-medium text-red-500">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {submitError}
            </div>
          )}

          {success && (
            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-600">
              {success}
            </div>
          )}

          <Button
            type="submit"
            className="w-full rounded-xl py-6 text-lg"
            disabled={isButtonDisabled}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Түр хүлээнэ үү...
              </span>
            ) : (
              "Нууц үг солих"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
