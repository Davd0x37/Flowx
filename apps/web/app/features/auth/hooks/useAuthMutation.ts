import { UserCredentials } from '../models/userForm';
import { userAuthLogin, userAuthLogout, userAuthSignup } from '@/config/api';
import { useMutation } from '@tanstack/react-query';
import { Fetch } from '@flowx/shared/utils/network/fetch';

// @FIXME: remove credentials 'include' in production, must be kept in development
// because of different ports in API and WEB
export const fetchAuthLogin = async ({ email, password }: UserCredentials) => {
  const payload = new URLSearchParams({
    email,
    password,
  });

  // Send as x-www-form-urlencoded
  return await Fetch.fetch(userAuthLogin, {
    method: 'POST',
    credentials: 'include',
    body: payload,
  });
};

export const fetchAuthLogout = async () => {
  return await Fetch.fetch(userAuthLogout, {
    method: 'POST',
    credentials: 'include',
  });
};

export const fetchAuthSignup = async ({ email, password }: UserCredentials) => {
  const payload = new URLSearchParams({
    email,
    password,
  });

  return await Fetch.fetch(userAuthSignup, {
    method: 'POST',
    credentials: 'include',
    body: payload,
  });
};

export const useAuthLoginMutation = () => {
  return useMutation({
    mutationFn: fetchAuthLogin,
  });
};

export const useAuthLogoutMutation = () => {
  return useMutation({
    mutationFn: fetchAuthLogout,
  });
};

export const useAuthSignupMutation = () => {
  return useMutation({
    mutationFn: fetchAuthSignup,
  });
};
