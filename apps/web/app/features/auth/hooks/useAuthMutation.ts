import { LoginFormSchemaType, SignupFormSchemaType } from '../models/userForm';
import { getApiEndpoint } from '@/config/api';
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
  checkSessionClientEndpoint,
  loginClientEndpoint,
  logoutClientEndpoint,
  signupClientEndpoint,
} from '@flowx/api_types/routes/auth';
import { Fetch } from '@flowx/shared/utils/network/fetch';

// Fetch login endpoint
// Login endpoint
const userAuthLogin = getApiEndpoint(loginClientEndpoint());

// Login mutation
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
// Logout endpoint
const userAuthLogout = getApiEndpoint(logoutClientEndpoint());

// Logout mutation
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
// Check session endpoint
const userAuthCheckSession = getApiEndpoint(checkSessionClientEndpoint());

// Check session mutation
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
// Signup endpoint
const userAuthSignup = getApiEndpoint(signupClientEndpoint());

// Signup mutation
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
