import { LoginFormSchemaType, SignupFormSchemaType } from '../models/userForm';
import { userAuthCheckSession, userAuthLogin, userAuthLogout, userAuthSignup } from '@/config/api';
import { useMutation } from '@tanstack/react-query';
import {
  CheckSessionErrorResponse,
  CheckSessionSuccessResponse,
  LoginErrorResponse,
  LoginSuccessResponse,
  LogoutErrorResponse,
  LogoutSuccessResponse,
  SignupErrorResponse,
  SignupSuccessResponse,
} from '@flowx/api_types/routes/auth';
import { Fetch } from '@flowx/shared/utils/network/fetch';

// Fetch login endpoint
export const useAuthLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginFormSchemaType) => {
      const payload = new URLSearchParams({
        email,
        password,
      });

      return Fetch.fetch<LoginSuccessResponse, LoginErrorResponse>(userAuthLogin, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      });
    },
  });
};

// Fetch logout endpoint
export const useAuthLogoutMutation = () => {
  return useMutation({
    mutationFn: () => {
      return Fetch.fetch<LogoutSuccessResponse, LogoutErrorResponse>(userAuthLogout, {
        method: 'POST',
        credentials: 'include',
      });
    },
  });
};

// Fetch check session endpoint
export const useAuthCheckSession = () => {
  return useMutation({
    mutationFn: () => {
      return Fetch.fetch<CheckSessionSuccessResponse, CheckSessionErrorResponse>(
        userAuthCheckSession,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
    },
  });
};

// Fetch signup endpoint
export const useAuthSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignupFormSchemaType) => {
      const payload = new URLSearchParams(data);

      return Fetch.fetch<SignupSuccessResponse, SignupErrorResponse>(userAuthSignup, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      });
    },
  });
};
