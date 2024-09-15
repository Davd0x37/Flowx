import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { lazy } from 'react'
import { MainViewport } from '~/components/layouts'
import { Toaster } from '~/components/ui/toaster'
import type { AuthProviderState } from '~/providers/AuthProvider'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

export const Route = createRootRouteWithContext<AuthProviderState>()({
  component: () => (
    <>
      {/* Default viewport container with styles */}
      <MainViewport>
        <Toaster />

        <Outlet />

        {/* Dev tools for react router */}
        <TanStackRouterDevtools initialIsOpen={false} />

        {/* Dev tools for react query */}
        <ReactQueryDevtools initialIsOpen={false} />
      </MainViewport>
    </>
  ),
})
