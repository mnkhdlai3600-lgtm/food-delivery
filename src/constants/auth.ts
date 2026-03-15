export type SignUpTypes = {
  email: string;
  password: string;
};

export type LoginTypes = {
  email: string;
  password: string;
};

export type SendPasswordResetMail = {
  email: string;
};

export type PasswordResetTypes = {
  token: string;
  password: string;
};

export type User = {
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

export type LoginResponse = {
  message?: string;
  token?: string;
  accessToken?: string;
  data?: User;
  user?: User;
};

export type SignUpResponseType = {
  message?: string;
  token?: string;
  accessToken?: string;
  data?: {
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
  user?: {
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

export type UpdateUserResponseType = {
  message?: string;
  data?: UserResponseType;
  user?: UserResponseType;
};

export type VerifyEmailResponseType = {
  message?: string;
  token?: string;
  accessToken?: string;
  data?: UserResponseType;
  user?: UserResponseType;
};

export type CurrentUserResponseType = {
  message?: string;
  data?: {
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
  user?: {
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
};

export const loginInitialValues = {
  email: "",
  password: "",
};

export const signUpInitialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const forgotPasswordInitialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const resetPasswordInitialValues = {
  password: "",
  confirmPassword: "",
};
