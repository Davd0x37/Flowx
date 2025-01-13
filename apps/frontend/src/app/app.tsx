import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from '~/components/errors/error-page'
import NotFound from '~/components/errors/not-found'
import { STORAGE_THEME_KEY } from '~/config/constants'
import { useAuth } from '~/hooks/use-auth'
import { AuthInitialState, AuthProvider } from '~/providers/auth-provider'
import { ThemeProvider } from '~/providers/theme-provider'
import { routeTree } from '~/routeTree.gen'

const queryClientInstance = new QueryClient()

// Set up a Router instance
const router = createRouter({
  context: AuthInitialState,
  defaultNotFoundComponent: NotFound,
  defaultPreload: 'intent',
  routeTree,
})

// Register router for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <Suspense fallback="loading...">
      {/* Error handling provider */}
      <ErrorBoundary FallbackComponent={ErrorPage}>
        {/* React query provider */}
        <QueryClientProvider client={queryClientInstance}>
          {/* Theme changing provider */}
          <ThemeProvider defaultTheme="system" storageKey={STORAGE_THEME_KEY}>
            <AuthProvider>
              {/* Main router outlet for app */}
              <AppRouterWithContext />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

function AppRouterWithContext() {
  const auth = useAuth()

  // @TODO: if check-session returns 500, navigate to /auth/login
  return <RouterProvider context={auth} router={router} />
}

export default App
