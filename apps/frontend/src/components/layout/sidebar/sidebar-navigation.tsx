import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { NavigationItem } from '~/types/navigation'
import { ChevronDownIcon } from '~/assets/icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar'
// import { useAuth } from '~/hooks/use-auth'
import { /* filterIfAuthenticated, */ filterDevModeItems } from '~/lib/utils'

type Props = {
  items: NavigationItem[]
}

type SidebarLinkProps = {
  item: NavigationItem
}

function SidebarItem({ item }: { item: NavigationItem }) {
  return item.children && item.children.length > 0 ? (
    <Collapsible
      asChild
      className="group/collapsible"
      defaultOpen={item.isActive}
      key={item.title}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton asChild tooltip={item.title}>
            <SidebarLink
              item={{
                ...item,
                render: () => (
                  <ChevronDownIcon className="ml-auto group-data-[state=open]/collapsible:rotate-180" />
                ),
              }}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <SidebarLink item={subItem} />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  ) : (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild>
        <SidebarLink item={item} />
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarLink({ item, ...props }: SidebarLinkProps) {
  const { t } = useTranslation()

  return (
    <Link to={item.url} {...props}>
      {item.icon && <item.icon />}
      <span>{t(item.title)}</span>
      {item.render && <item.render />}
    </Link>
  )
}

function SidebarNavigation({ items }: Props) {
  const { t } = useTranslation()
  // const { isAuthenticated } = useAuth()

  const navigationItems = items.filter(filterDevModeItems)
  // .filter(filterIfAuthenticated(isAuthenticated))

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('sidebar.groups.routes')}</SidebarGroupLabel>
      <SidebarMenu>
        {navigationItems.map((item) => (
          <SidebarItem item={item} key={item.url} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default SidebarNavigation
