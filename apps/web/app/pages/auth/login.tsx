import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import LoginForm from '@/features/auth/components/LoginForm';
import { useAuthLoginMutation } from '@/features/auth/hooks/useAuthMutation';
import { LoginFormSchemaType } from '@/features/auth/models/userForm';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import { formErrorValidate } from '@/features/auth/utils/formValidation';
import { LoginErrorResponse } from '@flowx/api_types/routes/auth';

export const LoginView = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const authLogin = useAuthLoginMutation();
  const { toast } = useToast();
  const { t } = useTranslation(['User']);

  // @TODO: reuse onSuccess and onError logic in signup or keep it separate?
  const handleSubmit =
    (form: UseFormReturn<LoginFormSchemaType, unknown, undefined>) =>
    (credentials: LoginFormSchemaType) => {
      authLogin.mutate(credentials, {
        onSuccess: ({ data: { email, firstName, lastName } }) => {
          const name = `${firstName} ${lastName}`;

          // Change authentication flag
          auth.login({ firstName, lastName, email });

          // Display welcome message
          toast({
            title: t('Welcome back, {{name}}!', { name }),
          });

          navigate('/');
        },

        onError(error, variables) {
          const { field, message } = formErrorValidate<LoginErrorResponse, LoginFormSchemaType>(
            error,
            variables,
          );
          if (!field || !message) return;

          form.setError(field, { message });
        },
      });
    };

  return (
    <>
      <h1 className="mb-12 text-center text-4xl font-bold">{t('Login')}</h1>
      <LoginForm onSubmit={handleSubmit} />

      <div className="mt-6 block text-right">
        <Button asChild variant="link">
          <Link to="/auth/signup" className="px-4 py-2 text-sm">
            {t('You do not have an account? Sign up!')}
          </Link>
        </Button>
      </div>
    </>
  );
};
