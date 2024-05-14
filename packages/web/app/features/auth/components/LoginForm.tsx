import { PropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PassKey } from '@/assets/icons';
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
import { Separator } from '@/components/ui/separator';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { UserLoginForm } from '@flowx/shared/models/user';

type Props = {
  onSubmit: (data: UserLoginForm) => void;
  toggleMode: () => void;
};

const LoginForm = ({ onSubmit, toggleMode }: PropsWithoutRef<Props>) => {
  const { t } = useTranslation('User');

  const form = useForm<UserLoginForm>({
    resolver: typeboxResolver(UserLoginForm),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  return (
    <>
      <Button>
        <PassKey height={20} />
        <span className="hidden md:ml-2 md:block">{t('Sign in with Passkeys')}</span>
      </Button>

      <Separator className="mb-6 mt-8 " />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="login"
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
              {t("Don't have account? Sign up!")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
