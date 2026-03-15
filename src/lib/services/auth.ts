import {
  CurrentUserResponseType,
  LoginTypes,
  PasswordResetTypes,
  SendPasswordResetMail,
  SignUpResponseType,
  SignUpTypes,
  UpdateUserResponseType,
  VerifyEmailResponseType,
} from "@/constants/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  endpoint: string;
  method?: RequestMethod;
  body?: unknown;
  token?: string | null;
};

export type UserResponseType = {
  _id?: string;
  email?: string;
  userName?: string;
  phoneNumber?: number;
  user_age?: number;
  address?: string;
  isVerified?: boolean;
  phone_verified?: boolean;
  role?: string;
};

export type SignInResponseType = {
  message?: string;
  token?: string;
  accessToken?: string;
  data?: UserResponseType;
  user?: UserResponseType;
};

const request = async <T>({
  endpoint,
  method = "GET",
  body,
  token,
}: RequestOptions): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const contentType = response.headers.get("content-type");

  let data: unknown = null;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    throw new Error(text || "Серверээс буруу хариу ирлээ");
  }

  if (!response.ok) {
    const errorData = data as { message?: string };
    throw new Error(errorData.message || "Алдаа гарлаа");
  }

  return data as T;
};

export const handleSignUp = async ({
  email,
  password,
}: SignUpTypes): Promise<SignUpResponseType> => {
  return request<SignUpResponseType>({
    endpoint: "/authentication/sign-up",
    method: "POST",
    body: { email, password },
  });
};

export const handleSignIn = async ({
  email,
  password,
}: LoginTypes): Promise<SignInResponseType> => {
  return request<SignInResponseType>({
    endpoint: "/authentication/sign-in",
    method: "POST",
    body: { email, password },
  });
};

export const handleSendPasswordResetRequest = async ({
  email,
}: SendPasswordResetMail): Promise<{ message?: string }> => {
  return request<{ message?: string }>({
    endpoint: "/authentication/reset-password-request",
    method: "POST",
    body: { email },
  });
};

export const handleVerifyEmail = async (
  token: string,
): Promise<VerifyEmailResponseType> => {
  return request<VerifyEmailResponseType>({
    endpoint: "/authentication/verify-email",
    method: "POST",
    body: { token },
  });
};

export const handlePasswordReset = async ({
  token,
  password,
}: PasswordResetTypes): Promise<{ message?: string }> => {
  return request<{ message?: string }>({
    endpoint: "/authentication/reset-password",
    method: "PUT",
    body: {
      token,
      newPassword: password,
    },
  });
};

export type VerifyOtpResponseType = {
  message?: string;
  token?: string;
};

export const handleVerifyOtp = async (
  email: string,
  otp: string,
): Promise<VerifyOtpResponseType> => {
  return request<VerifyOtpResponseType>({
    endpoint: "/authentication/verify-reset-password",
    method: "POST",
    body: { email, otp },
  });
};

export const handleUpdateUser = async (body: {
  userName?: string;
  phoneNumber?: number;
  user_age?: number;
  address?: string;
}): Promise<UpdateUserResponseType> => {
  const token = localStorage.getItem("token");

  return request<UpdateUserResponseType>({
    endpoint: "/authentication/update-user",
    method: "PUT",
    body,
    token,
  });
};

export const handleGetCurrentUser =
  async (): Promise<CurrentUserResponseType> => {
    const token = localStorage.getItem("token");

    return request<CurrentUserResponseType>({
      endpoint: "/authentication/current-user",
      method: "GET",
      token,
    });
  };
