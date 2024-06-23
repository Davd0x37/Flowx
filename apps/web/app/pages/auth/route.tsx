import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuthSignupMutation } from '@/hooks/useAuthMutation';
import { UserCredentials, UserRegisterForm } from '@/models/userForm';
import { useAuth } from '@/providers/AuthProvider';
import { ApiResponseWrapper } from '@flowx/shared/types/response';

// @TODO: use single form for both login and register

export const Authenticate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const authSignup = useAuthSignupMutation();
  const { t } = useTranslation(['User']);

  const [loginMode, setLoginMode] = useState(true);
  const modeTitle = useMemo(() => (loginMode ? t('Login') : t('Register')), [loginMode]);

  const onErrorFn = (
    error: Error,
    variables: Record<string, unknown>,
    form: UseFormReturn<UserCredentials | UserRegisterForm>,
  ) => {
    const error$ = error as unknown as ApiResponseWrapper['error'];
    const field = error$?.data?.field;
    const message = error$?.message;

    if (
      typeof message === 'string' &&
      typeof field === 'string' &&
      Object.hasOwn(variables, field)
    ) {
      form.setError(field as keyof UserCredentials, { message });
    }
  };

  const handleLogin =
    (form: UseFormReturn<UserCredentials, unknown, undefined>) =>
    (credentials: UserCredentials) => {
      auth.login({
        credentials,

        onSuccess: () => {
          navigate('/');
        },

        onError(error, variables) {
          onErrorFn(error, variables, form as UseFormReturn<UserCredentials | UserRegisterForm>);
        },
      });
    };

  const handleRegister =
    (form: UseFormReturn<UserRegisterForm, unknown, undefined>) => (ev: UserRegisterForm) => {
      authSignup.mutate(ev, {
        onSuccess: () => {
          navigate('/');
        },

        onError(error, variables) {
          onErrorFn(error, variables, form as UseFormReturn<UserCredentials | UserRegisterForm>);
        },
      });
    };

  const toggleMode = () => {
    setLoginMode(!loginMode);
  };

  // @TODO: move this to prehandler or authprovider?
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  // @TODO: separate login and register into two routes
  return (
    <div className="m-auto flex w-full max-w-lg flex-col justify-center p-5 pt-2">
      <h1 className="mb-12 text-center text-4xl font-bold">{modeTitle}</h1>

      {loginMode ? (
        <LoginForm onSubmit={handleLogin} toggleMode={toggleMode} />
      ) : (
        <RegisterForm onSubmit={handleRegister} toggleMode={toggleMode} />
      )}
    </div>
  );
};
