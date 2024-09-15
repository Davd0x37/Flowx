import { Outlet, createFileRoute } from '@tanstack/react-router'

const AuthLayout = () => {
  return (
    <div className="m-auto flex h-screen max-w-lg flex-col justify-center">
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})
