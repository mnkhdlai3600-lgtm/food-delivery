import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .required("Имэйлээ оруулна уу")
    .matches(emailRegex, "Зөв имэйл хаяг оруулна уу"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Имэйлээ оруулна уу")
    .matches(emailRegex, "Зөв имэйл хаяг оруулна уу"),

  password: Yup.string().required("Нууц үгээ оруулна уу"),
});

export const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .required("Имэйлээ оруулна уу")
    .matches(emailRegex, "Зөв имэйл хаяг оруулна уу"),

  password: Yup.string()
    .required("Нууц үгээ оруулна уу")
    .matches(
      passwordRegex,
      "Нууц үг хамгийн багадаа 8 тэмдэгт, 1 том үсэг, 1 жижиг үсэг, 1 тусгай тэмдэгт агуулсан байх ёстой",
    ),

  passwordConfirmation: Yup.string()
    .required("Нууц үгээ давтаж оруулна уу")
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна"),
});

export const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Нууц үгээ оруулна уу")
    .matches(
      passwordRegex,
      "Нууц үг хамгийн багадаа 8 тэмдэгт, 1 том үсэг, 1 жижиг үсэг, 1 тусгай тэмдэгт агуулсан байх ёстой",
    ),

  passwordConfirmation: Yup.string()
    .required("Нууц үгээ давтаж оруулна уу")
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна"),
});

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Нууц үгээ оруулна уу")
    .matches(
      passwordRegex,
      "Нууц үг хамгийн багадаа 8 тэмдэгт, 1 том үсэг, 1 жижиг үсэг, 1 тусгай тэмдэгт агуулсан байх ёстой",
    ),

  confirmPassword: Yup.string()
    .required("Нууц үгээ давтаж оруулна уу")
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна"),
});

export const determineValidationSchema = (currentStep: number) => {
  if (currentStep === 0) return emailValidationSchema;
  return passwordValidationSchema;
};
