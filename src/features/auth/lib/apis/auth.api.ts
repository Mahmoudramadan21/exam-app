import "server-only";

import { HEADERS } from "@/shared/lib/constants/api.constant";
import {
  ILoginPayload,
  ILoginResponse,
  ILoginSchema,
  IOtpStepSchema,
  IUserInfoSchema,
} from "../types/auth";
import { IApiResponse } from "@/shared/lib/types/api";
import { emailStepSchema } from "../schemas/email-step.schema";

export const login = async (loginFields: ILoginSchema) => {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginFields),
    headers: {
      ...HEADERS.jsonBody,
    },
  });

  const payload: ILoginResponse = await response.json();

  return payload;
};

export const sendEmailStepAction = async (email: string) => {
  const parsedEmail = emailStepSchema.parse({ email });

  const response = await fetch(
    `${process.env.BACKEND_URL}/auth/send-email-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedEmail),
    },
  );

  const data: IApiResponse = await response.json();

  if (!data.status && data.errors) {
    throw new Error(data.errors?.[0].message);
  }

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to send email verification");
  }

  return data;
};

export const confirmOtpStepAction = async (payload: IOtpStepSchema) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/auth/confirm-email-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data: IApiResponse = await response.json();

  if (!data.status && data.errors) {
    throw new Error(data.errors?.[0].message);
  }

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to verify OTP Code");
  }

  return data;
};

export const userInfoStepAction = async (payload: IUserInfoSchema) => {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: IApiResponse = await response.json();

  console.log(data);

  if (!data.status && data.errors) {
    throw new Error(data.errors?.[0].message);
  }

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to register");
  }

  return data;
};

export const forgotPasswordAction = async (email: string) => {
  const parsedEmail = emailStepSchema.parse({ email });

  const response = await fetch(
    `${process.env.BACKEND_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedEmail),
    },
  );

  const data: IApiResponse = await response.json();

  if (!data.status && data.errors) {
    throw new Error(data.errors?.[0].message);
  }

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to send reset password email");
  }

  return data;
};
