import '~/assets/base.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from '~/components/errors/ErrorPage/ErrorPage'
import { initialState as AuthInitialState, AuthProvider } from '~/providers/AuthProvider'
import { I18nextProvider, i18n } from '~/providers/I18nProvider'
import { StorageThemeKey } from './config/constants'
import { useAuth } from './hooks/useAuth'
import { ThemeProvider } from './providers/ThemeProvider'
import { routeTree } from './routeTree.gen'

const queryClientInstance = new QueryClient()

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: AuthInitialState,
  defaultPreload: 'intent',
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <Suspense fallback="loading...">
      {/* Error handling provider */}
      <ErrorBoundary FallbackComponent={ErrorPage}>
        {/* React query provider */}
        <QueryClientProvider client={queryClientInstance}>
          {/* Translation provider */}
          <I18nextProvider i18n={i18n}>
            {/* Theme changing provider */}
            <ThemeProvider defaultTheme="dark" storageKey={StorageThemeKey}>
              <AuthProvider>
                {/* Main router outlet for app */}
                <AppRouterWithContext />
              </AuthProvider>
            </ThemeProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

const AppRouterWithContext = () => {
  const auth = useAuth()

  return <RouterProvider router={router} context={auth} />
}

export default App
