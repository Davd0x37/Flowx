import type { NavigationItem } from '~/types/navigation'
import {
  AdvancedSettingsIcon,
  AuthIcon,
  BoxIcon,
  GeneralSettingsIcon,
  HomeIcon,
  IntegrationIcon,
  NotificationsSettingsIcon,
  SchemaIcon,
  SecuritySettingsIcon,
  SettingsIcon,
} from '~/assets/icons'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '~/components/ui/sidebar'
import SidebarNavigation from './sidebar-navigation'
import SidebarUser from './sidebar-user'

const items: NavigationItem[] = [
  {
    icon: HomeIcon,
    title: 'dashboard.page.title.homepage',
    url: '/',
  },
  {
    icon: AuthIcon,
    showInDevMode: true,
    title: 'auth.page.title.authenticate',
    url: '/auth/login',
  },
  {
    children: [
      {
        icon: GeneralSettingsIcon,
        title: 'user.page.title.general',
        url: '/user/settings',
      },
      {
        icon: SecuritySettingsIcon,
        title: 'user.page.title.security',
        url: '/user/settings/security',
      },
      {
        icon: NotificationsSettingsIcon,
        title: 'user.page.title.notifications',
        url: '/user/settings/notifications',
      },
      {
        icon: AdvancedSettingsIcon,
        title: 'user.page.title.advanced',
        url: '/user/settings/advanced',
      },
    ],
    icon: SettingsIcon,
    isActive: true,
    title: 'user.page.title.settings',
    url: '/user/settings',
  },
  {
    icon: BoxIcon,
    title: 'services.page.title.homepage',
    url: '/services',
  },
  {
    icon: SchemaIcon,
    title: 'automations.page.title.homepage',
    url: '/automations',
  },
  {
    icon: IntegrationIcon,
    title: 'integrations.page.title.homepage',
    url: '/integrations',
  },
]

function SidebarContainer() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SidebarUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation items={items} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default SidebarContainer
