import { LoginRoute, type LoginRouteRequest } from '@flowx/api'
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
import { useAuthLoginMutation } from '~/api/auth/use-auth-mutation'
import { useAuth } from '~/hooks/use-auth'
import { useToast } from '~/hooks/use-toast'

function LoginForm() {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()
  const authLogin = useAuthLoginMutation()
  const { toast } = useToast()

  const form = useForm<LoginRouteRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginRoute.schema.request),
  })
  const { control, handleSubmit } = form

  const onSubmit = handleSubmit((credentials) => {
    authLogin.mutate(credentials, {
      onError(error, variables) {
        // Show error in login and password fields
        console.log('error logging in', error, variables)
      },

      onSuccess: ({ email, id, username }) => {
        const welcomeMessage = t('auth.messages.success.welcome_back', {
          name: username,
        })

        // Change authentication flag
        auth.login({ email, id, username })

        // Display welcome message
        toast({
          title: welcomeMessage,
        })

        navigate({ to: '/' })
      },
    })
  })

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.fields.names.email')}</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="Email..." {...field} />
              </FormControl>
              <FormDescription>
                {t('auth.fields.descriptions.email_address')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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

        <Button type="submit">{t('auth.actions.login')}</Button>
      </form>
    </Form>
  )
}

export default LoginForm
