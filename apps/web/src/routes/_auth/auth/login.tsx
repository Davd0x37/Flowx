import type { LoginErrorResponse } from '@flowx/api_types/routes/auth'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '~/components/auth/LoginForm'
import { Button } from '~/components/ui/button'
import { useToast } from '~/hooks/use-toast'
import { useAuth } from '~/hooks/useAuth'
import { useAuthLoginMutation } from '~/hooks/useAuthMutation'
import { formErrorValidate } from '~/lib/formValidation'
import type { LoginFormSchemaType } from '~/models/userForm'

export const LoginView = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const authLogin = useAuthLoginMutation()
  const { toast } = useToast()
  const { t } = useTranslation('auth')

  const handleSubmit =
    (form: UseFormReturn<LoginFormSchemaType, unknown, undefined>) =>
    (credentials: LoginFormSchemaType) => {
      authLogin.mutate(credentials, {
        onSuccess: ({ data: { email, firstName, lastName } }) => {
          const name = `${firstName} ${lastName}`
          const welcomeMessage = t('messages.success.welcome_back', { name })

          // Change authentication flag
          auth.login({ firstName, lastName, email })

          // Display welcome message
          toast({
            title: welcomeMessage,
          })

          navigate({ to: '/' })
        },

        onError(error, variables) {
          const { field, message } = formErrorValidate<LoginErrorResponse, LoginFormSchemaType>(
            error,
            variables,
          )
          if (!field || !message) return

          form.setError(field, { message })
        },
      })
    }

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
  )
}

export const Route = createFileRoute('/_auth/auth/login')({
  component: LoginView,
})
