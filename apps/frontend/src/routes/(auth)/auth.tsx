import { createFileRoute, Outlet } from '@tanstack/react-router'

function AuthLayout() {
  return (
    <div className="m-auto flex h-screen max-w-lg flex-col justify-center">
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/(auth)/auth')({
  component: AuthLayout,
})
