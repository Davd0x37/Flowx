import { PropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'app/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'app/components/ui/form';
import { Input } from 'app/components/ui/input';
import { type TUserRegisterForm, UserRegisterForm } from 'features/user/models/user.model';

type Props = {
  onSubmit: (data: TUserRegisterForm) => void;
  toggleMode: () => void;
};

const RegisterForm = ({ onSubmit, toggleMode }: PropsWithoutRef<Props>) => {
  const { t } = useTranslation('User');

  const form = useForm<TUserRegisterForm>({
    resolver: zodResolver(UserRegisterForm),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Email')}</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormDescription>{t('Your email address used to login into app')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Password')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t('Your super secret password that will allow you to use the app')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Repeat password')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {t('Please insert your password one more time - we have to check if you entered first correctly')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t('Create account')}</Button>

          <div className="block text-right">
            <Button type="button" variant="link" onClick={toggleMode}>
              {t('Already have account? Sign in!')}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
