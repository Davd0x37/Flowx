import { UserCredentials } from '../models/userForm';
import { userAuthPath } from '@/config/api';
import { useMutation } from '@tanstack/react-query';
import { Fetch } from '@flowx/shared/utils/network/fetch';

export const fetchUserAuth = async ({ email, password }: UserCredentials) => {
  const payload = new URLSearchParams({
    email,
    password,
  });

  // Send as x-www-form-urlencoded
  return await Fetch.fetch(userAuthPath, {
    method: 'POST',
    body: payload,
  });
};

const useAuthMutation = () => {
  return useMutation({
    mutationFn: fetchUserAuth,
  });
};

export default useAuthMutation;
