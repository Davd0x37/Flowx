import { UserCredentials } from '../../models/userForm';
import { PropsWithoutRef } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { typeboxResolver } from '@hookform/resolvers/typebox';

type Props = {
  onSubmit: (
    form: UseFormReturn<UserCredentials, unknown, undefined>,
  ) => (data: UserCredentials) => void;
  toggleMode: () => void;
};

const LoginForm = ({ onSubmit, toggleMode }: PropsWithoutRef<Props>) => {
  const { t } = useTranslation('User');

  const form = useForm<UserCredentials>({
    resolver: typeboxResolver(UserCredentials),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit(form))(event);
          }}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Email')}</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormDescription>{t('Your email address used to authenticate')}</FormDescription>
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
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription>
                  {t('Your super secret password that will allow you to use the app')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t('Login')}</Button>

          <div className="block text-right">
            <Button type="button" variant="link" onClick={toggleMode}>
              {t('You do not have an account? Sign up!')}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
