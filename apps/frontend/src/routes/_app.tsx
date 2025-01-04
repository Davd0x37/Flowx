import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import SidebarContainer from '~/components/layout/sidebar/sidebar-container'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'

function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen flex-row gap-4 p-2">
        <SidebarContainer />

        <div className="flex-1 p-4 md:pt-2 md:pl-0">
          <SidebarTrigger className="mb-6" />

          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: '/auth/login',
      })
    }
  },
  component: MainLayout,
})
