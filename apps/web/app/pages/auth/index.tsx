import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AuthenticateLayout from '@/components/Layouts/AuthenticateLayout';
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';
import useAuthMutation from '@/features/auth/hooks/useAuthMutation';
import { UserCredentials, UserRegisterForm } from '@/features/auth/models/userForm';
import { ApiResponseWrapper } from '@flowx/shared/types/response';

export const Authenticate = () => {
  const { mutate } = useAuthMutation();
  const { t } = useTranslation(['User']);

  const [loginMode, setLoginMode] = useState(true);
  const modeTitle = useMemo(() => (loginMode ? t('Login') : t('Register')), [loginMode]);

  const handleLogin = (
    ev: UserCredentials,
    form: UseFormReturn<UserCredentials, unknown, undefined>,
  ) => {
    mutate(ev, {
      onSuccess: (data, vars, ctx) => {
        console.log(data, vars, ctx);
      },

      onError(error, variables) {
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
      },
    });
  };

  const handleRegister = (ev: UserRegisterForm) => {
    console.log(ev);
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
