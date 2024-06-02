import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthenticateLayout from '@/components/Layouts/AuthenticateLayout';
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';
import { useAuthLoginMutation, useAuthSignupMutation } from '@/features/auth/hooks/useAuthMutation';
import { UserCredentials, UserRegisterForm } from '@/features/auth/models/userForm';
import { ApiResponseWrapper } from '@flowx/shared/types/response';

// @FIXME: use single form for both login and register

export const Authenticate = () => {
  const navigate = useNavigate();
  const authLogin = useAuthLoginMutation();
  const authSignup = useAuthSignupMutation();
  const { t } = useTranslation(['User']);

  const [loginMode, setLoginMode] = useState(true);
  const modeTitle = useMemo(() => (loginMode ? t('Login') : t('Register')), [loginMode]);

  // @FIXME: fix this xD
  const onError = (
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
    (form: UseFormReturn<UserCredentials, unknown, undefined>) => (ev: UserCredentials) => {
      authLogin.mutate(ev, {
        onSuccess: () => {
          navigate('/');
        },

        onError(error, variables) {
          onError(error, variables, form as UseFormReturn<UserCredentials | UserRegisterForm>);
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
          onError(error, variables, form as UseFormReturn<UserCredentials | UserRegisterForm>);
        },
      });
    };

  const toggleMode = () => {
    setLoginMode(!loginMode);
  };

  return (
    <AuthenticateLayout>
      <div className="m-auto flex w-full max-w-lg flex-col justify-center p-5 pt-2">
        <h1 className="mb-12 text-center text-4xl font-bold">{modeTitle}</h1>

        {loginMode ? (
          <LoginForm onSubmit={handleLogin} toggleMode={toggleMode} />
        ) : (
          <RegisterForm onSubmit={handleRegister} toggleMode={toggleMode} />
        )}
      </div>
    </AuthenticateLayout>
  );
};
