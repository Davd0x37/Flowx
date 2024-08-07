import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '@/features/auth/components/SignupForm';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthSignupMutation } from '@/features/auth/hooks/useAuthMutation';
import { SignupFormSchemaType } from '@/features/auth/models/userForm';
import { formErrorValidate } from '@/features/auth/utils/formValidation';
import { Button } from '@ui/button';
import { useToast } from '@ui/use-toast';
import { SignupErrorResponse } from '@flowx/api_types/routes/auth';

const RegisterView = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const authSignup = useAuthSignupMutation();
  const { toast } = useToast();
  const { t } = useTranslation('auth');

  const handleSubmit =
    (form: UseFormReturn<SignupFormSchemaType, unknown, undefined>) =>
    (credentials: SignupFormSchemaType) => {
      authSignup.mutate(credentials, {
        onSuccess: ({ data: { email, firstName, lastName } }) => {
          const name = `${firstName} ${lastName}`;

          // Change authentication flag
          auth.login({ firstName, lastName, email });

          // Display welcome message
          toast({
            title: t('messages.success.account_created', { name }),
          });

          navigate('/');
        },

        onError(error, variables) {
          const { field, message } = formErrorValidate<SignupErrorResponse, SignupFormSchemaType>(
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
      <h1 className="mb-12 text-center text-4xl font-bold">{t('actions.register')}</h1>
      <SignupForm onSubmit={handleSubmit} />

      <div className="mt-6 block text-right">
        <Button asChild variant="link">
          <Link to="/auth/login" className="px-4 py-2 text-sm">
            {t('actions.signin')}
          </Link>
        </Button>
      </div>
    </>
  );
};

export { RegisterView as Component };
