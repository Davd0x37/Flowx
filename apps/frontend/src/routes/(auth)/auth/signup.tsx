import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '~ui/button'
import { useTranslation } from 'react-i18next'
import RegisterForm from '~/components/auth/register-form'

function RegisterPage() {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="mb-12 text-center text-4xl font-bold">
        {t('auth.actions.register')}
      </h1>

      <RegisterForm />

      <div className="mt-6 block text-right">
        <Button asChild variant="link">
          <Link className="px-4 py-2 text-sm" to="/auth/login">
            {t('auth.actions.signin')}
          </Link>
        </Button>
      </div>
    </>
  )
}

const Route = createFileRoute('/(auth)/auth/signup')({
  component: RegisterPage,
})

export { RegisterPage as Component, Route }
