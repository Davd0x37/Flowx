import type { SignupErrorResponse } from '@flowx/api_types/routes/auth'
import { Link, useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SignupForm } from '~/components/auth/SignupForm'
import { Button } from '~/components/ui/button'
import { useToast } from '~/hooks/use-toast'
import { useAuth } from '~/hooks/useAuth'
import { useAuthSignupMutation } from '~/hooks/useAuthMutation'
import { formErrorValidate } from '~/lib/formValidation'
import type { SignupFormSchemaType } from '~/models/userForm'

const RegisterView = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const authSignup = useAuthSignupMutation()
  const { toast } = useToast()
  const { t } = useTranslation('auth')

  const handleSubmit =
    (form: UseFormReturn<SignupFormSchemaType, unknown, undefined>) =>
    (credentials: SignupFormSchemaType) => {
      authSignup.mutate(credentials, {
        onSuccess: ({ data: { email, firstName, lastName } }) => {
          const name = `${firstName} ${lastName}`
          const welcomeMessage = t('messages.success.account_created', { name })

          // Change authentication flag
          auth.login({ firstName, lastName, email })

          // Display welcome message
          toast({
            title: welcomeMessage,
          })

          navigate({ to: '/' })
        },

        onError(error, variables) {
          const { field, message } = formErrorValidate<SignupErrorResponse, SignupFormSchemaType>(
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
  )
}

export { RegisterView as Component }

export const Route = createFileRoute('/_auth/auth/signup')({
  component: RegisterView,
})
