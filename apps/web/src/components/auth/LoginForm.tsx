import { typeboxResolver } from '@hookform/resolvers/typebox'
import type { PropsWithoutRef } from 'react'
import { type UseFormReturn, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { LoginFormSchema, type LoginFormSchemaType } from '~/models/userForm'

type Props = {
  onSubmit: (
    form: UseFormReturn<LoginFormSchemaType, unknown, undefined>,
  ) => (data: LoginFormSchemaType) => void
}

export const LoginForm = ({ onSubmit }: PropsWithoutRef<Props>) => {
  const { t } = useTranslation('auth')

  const form = useForm<LoginFormSchemaType>({
    resolver: typeboxResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit(form))(event)
          }}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.names.email')}</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." autoFocus {...field} />
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

          <Button type="submit">{t('actions.login')}</Button>
        </form>
      </Form>
    </>
  )
}
