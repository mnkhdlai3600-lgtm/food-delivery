import {
  PasswordResetTypes,
  SendPasswordResetMail,
  SignUpTypes,
} from "@/constants/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://project-7-backend-0wmd.onrender.com";

export const handleSignUp = async ({ email, password }: SignUpTypes) => {
  const endPoint = "/authentication/sign-up";

  try {
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Бүртгэл амжилтгүй");
    return data;
  } catch (error: any) {
    console.error("SignUp Error:", error.message);
    throw error;
  }
};

export const handleSignIn = async ({ email, password }: SignUpTypes) => {
  const endPoint = "/authentication/sign-in";

  try {
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Нэвтрэхэд алдаа гарлаа");
    return data;
  } catch (error: any) {
    console.error("SignIn Error:", error.message);
    throw error;
  }
};

export const handleSendPasswordResetRequest = async ({
  email,
}: SendPasswordResetMail) => {
  const endPoint = "/authentication/reset-password-request";

  try {
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log(response);
    if (!response.ok)
      throw new Error(data.message || "Имэйл илгээхэд алдаа гарлаа");
    return data;
  } catch (error: any) {
    console.error("Forgot Password Mail Error:", error.message);
    throw error;
  }
};

export const handlePasswordReset = async ({
  token,
  password,
}: PasswordResetTypes) => {
  const endPoint = "/authentication/reset-password";

  try {
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Нууц үг шинэчлэхэд алдаа гарлаа");
    return data;
  } catch (error: any) {
    console.error("Password Reset Error:", error.message);
    throw error;
  }
};
export const handleVerifyOtp = async (email: string, otp: string) => {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const endPoint = "/authentication/verify-reset-password";

  try {
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Серверээс ирсэн буруу хариулт:", text);
      throw new Error(
        "Сервертэй холбогдоход алдаа гарлаа (API хаяг буруу байж магадгүй)",
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OTP код буруу байна");
    }

    return data;
  } catch (error: any) {
    console.error("OTP Verification Error:", error.message);
    throw error;
  }
};

export const handleVerifyEmail = async (token: string) => {
  const endPoint = "/authentication/verify-email";

  try {
    const response = await fetch(`${API_URL}${endPoint}?token=${token}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Email баталгаажуулахад алдаа гарлаа");
    }

    return data;
  } catch (error: any) {
    console.error("Verify Email Error:", error.message);
    throw error;
  }
};
export const handleUpdateUser = async (body: {
  userName?: string;
  phoneNumber?: number;
  user_age?: number;
  address?: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authentication/update-user`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Мэдээлэл шинэчлэхэд алдаа гарлаа");
  }

  return data;
};
