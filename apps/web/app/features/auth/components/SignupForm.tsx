import { SignupFormSchema, SignupFormSchemaType } from '../models/userForm';
import { PropsWithoutRef } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Button } from '~ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~ui/form';
import { Input } from '~ui/input';

type Props = {
  onSubmit: (
    form: UseFormReturn<SignupFormSchemaType, unknown, undefined>,
  ) => (data: SignupFormSchemaType) => void;
};

const RegisterForm = ({ onSubmit }: PropsWithoutRef<Props>) => {
  const { t } = useTranslation('auth');

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
                  <FormLabel>{t('fields.names.first_name')}</FormLabel>
                  <FormControl>
                    <Input autoFocus {...field} />
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
                  <FormLabel>{t('fields.names.last_name')}</FormLabel>
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
                <FormLabel>{t('fields.names.email')}</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormDescription>{t('fields.descriptions.email_address')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.names.password')}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription>{t('fields.descriptions.secret_password')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t('actions.create_account')}</Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
