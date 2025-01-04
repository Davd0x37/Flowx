import type { RegisterRouteRequest } from '@flowx/api'
import { RegisterRoute } from '@flowx/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '~ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~ui/form'
import { Input } from '~ui/input'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAuthRegisterMutation } from '~/api/auth/use-auth-mutation'
import { useAuth } from '~/hooks/use-auth'
import { useToast } from '~/hooks/use-toast'

function RegisterForm() {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()
  const authRegister = useAuthRegisterMutation()
  const { toast } = useToast()

  const form = useForm<RegisterRouteRequest>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(RegisterRoute.schema.request),
  })

  function onSubmit(credentials: RegisterRouteRequest) {
    console.log(credentials)
    authRegister.mutate(credentials, {
      onError(error, variables) {
        // Show error in login and password fields
        console.log('error logging in', error, variables)
      },

      onSuccess: ({ email, username }) => {
        const welcomeMessage = t('auth.messages.success.account_created', {
          name: username,
        })

        // Change authentication flag
        auth.login({ email, username })

        // Display welcome message
        toast({
          title: welcomeMessage,
        })

        navigate({ to: '/' })
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.fields.names.username')}</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.fields.names.email')}</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormDescription>
                {t('auth.fields.descriptions.email_address')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.fields.names.password')}</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>
                {t('auth.fields.descriptions.secret_password')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{t('auth.actions.create_account')}</Button>
      </form>
    </Form>
  )
}

export default RegisterForm
