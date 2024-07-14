import { SignupFormSchema, SignupFormSchemaType } from '../models/userForm';
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
    form: UseFormReturn<SignupFormSchemaType, unknown, undefined>,
  ) => (data: SignupFormSchemaType) => void;
};

const RegisterForm = ({ onSubmit }: PropsWithoutRef<Props>) => {
  const { t } = useTranslation('User');

  const form = useForm<SignupFormSchemaType>({
    resolver: typeboxResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('First name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Last name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <Button type="submit">{t('Create account')}</Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
