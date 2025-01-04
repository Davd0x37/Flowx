import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '~ui/button'
import { useTranslation } from 'react-i18next'
import LoginForm from '~/components/auth/login-form'

function LoginPage() {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="mb-12 text-center text-4xl font-bold">
        {t('auth.actions.login')}
      </h1>

      <LoginForm />

      <div className="mt-6 block text-right">
        <Button asChild variant="link">
          <Link className="px-4 py-2 text-sm" to="/auth/signup">
            {t('auth.actions.signup')}
          </Link>
        </Button>
      </div>
    </>
  )
}

const Route = createFileRoute('/(auth)/auth/login')({
  component: LoginPage,
})

export { LoginPage as Component, Route }
