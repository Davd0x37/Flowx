import { userAuthCheckSession, userAuthLogin, userAuthLogout, userAuthSignup } from '@/config/api';
import { UserCredentials } from '@/models/userForm';
import { useMutation } from '@tanstack/react-query';
import { Fetch } from '@flowx/shared/utils/network/fetch';

// Fetch login endpoint
export const useAuthLoginMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password }: UserCredentials) => {
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
    },
  });
};

// Fetch logout endpoint
export const useAuthLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return await Fetch.fetch(userAuthLogout, {
        method: 'POST',
        credentials: 'include',
      });
    },
  });
};

// Fetch check session endpoint
export const useAuthCheckSession = () => {
  return useMutation({
    mutationFn: async () => {
      return await Fetch.fetch(userAuthCheckSession, {
        method: 'GET',
        credentials: 'include',
      });
    },
  });
};

// Fetch signup endpoint
export const useAuthSignupMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password }: UserCredentials) => {
      const payload = new URLSearchParams({
        email,
        password,
      });

      return await Fetch.fetch(userAuthSignup, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      });
    },
  });
};
