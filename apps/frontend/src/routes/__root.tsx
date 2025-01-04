import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from '~ui/toaster'
import { lazy } from 'react'
import type { AuthProviderState } from '~/providers/auth-provider'
import { IS_DEV } from '~/config/constants'

const TanStackRouterDevtools = !IS_DEV
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

const ReactQueryDevtools = !IS_DEV
  ? () => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )

export const Route = createRootRouteWithContext<AuthProviderState>()({
  component: () => (
    <>
      {/* Default viewport container with styles */}
      <div className="font-sans text-base antialiased transition-colors">
        <Toaster />

        <Outlet />

        {/* Dev tools for react router */}
        <TanStackRouterDevtools initialIsOpen={false} />

        {/* Dev tools for react query */}
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </>
  ),
})
