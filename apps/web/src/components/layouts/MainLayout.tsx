import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '~/components/sidebar/Sidebar'

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-row gap-6 p-2">
      <Sidebar className="flex-1" />

      <div className="flex-1 p-4 md:p-10">
        <Outlet />
      </div>
    </div>
  )
}

export { MainLayout }
