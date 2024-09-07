import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '~/features/auth/components/LoginForm';
import { useAuth } from '~/features/auth/hooks/useAuth';
import { useAuthLoginMutation } from '~/features/auth/hooks/useAuthMutation';
import { LoginFormSchemaType } from '~/features/auth/models/userForm';
import { formErrorValidate } from '~/features/auth/utils/formValidation';
import { Button } from '~ui/button';
import { useToast } from '~ui/use-toast';
import { LoginErrorResponse } from '@flowx/api_types/routes/auth';

export const LoginView = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const authLogin = useAuthLoginMutation();
  const { toast } = useToast();
  const { t } = useTranslation('auth');

  const handleSubmit =
    (form: UseFormReturn<LoginFormSchemaType, unknown, undefined>) =>
    (credentials: LoginFormSchemaType) => {
      authLogin.mutate(credentials, {
        onSuccess: ({ data: { email, firstName, lastName } }) => {
          const name = `${firstName} ${lastName}`;
          const welcomeMessage = t('messages.success.welcome_back', { name });

          // Change authentication flag
          auth.login({ firstName, lastName, email });

          // Display welcome message
          if (welcomeMessage) {
            toast({
              title: welcomeMessage,
            });
          }

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
      <h1 className="mb-12 text-center text-4xl font-bold">{t('actions.login')}</h1>
      <LoginForm onSubmit={handleSubmit} />

      <div className="mt-6 block text-right">
        <Button asChild variant="link">
          <Link to="/auth/signup" className="px-4 py-2 text-sm">
            {t('actions.signup')}
          </Link>
        </Button>
      </div>
    </>
  );
};
