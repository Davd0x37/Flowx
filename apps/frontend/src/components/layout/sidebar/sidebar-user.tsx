import type { UserStatus as UserStatusType } from '@flowx/api'
import { getAcronyms } from '@flowx/utils'
import { useNavigate } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~ui/sidebar'
import { useTranslation } from 'react-i18next'
import { useUserStatusMutation } from '~/api/user/use-user-mutation'
import { ArrowsExpandDiagonalIcon, LogoutIcon } from '~/assets/icons'
import UserAvatar from '~/components/user/user-avatar'
import UserStatus from '~/components/user/user-status-indicator'
import { useAuth } from '~/hooks/use-auth'
import useUserStore from '~/stores/user'

function SidebarUser() {
  const { isMobile } = useSidebar()
  const { t } = useTranslation()
  const auth = useAuth()
  const { avatar, changeStatus, name, status } = useUserStore()
  const hasEmail = typeof auth.user.email === 'string'
  const email = hasEmail ? (auth.user.email as string) : ''
  const nameAcronym = getAcronyms(name) ?? ''
  const navigate = useNavigate()
  const useUserStatus = useUserStatusMutation()

  const handleLogout = () => {
    auth.logout(() =>
      navigate({
        to: '/auth/login',
      }),
    )
  }

  const changeUserStatus = (status: UserStatusType) => () => {
    useUserStatus.mutate(status)
    changeStatus(status)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <UserAvatar avatar={avatar} nameAcronym={nameAcronym}>
                <UserStatus status={status} />
              </UserAvatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                {hasEmail && <span className="truncate text-xs">{email}</span>}
              </div>
              <ArrowsExpandDiagonalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar avatar={avatar} nameAcronym={nameAcronym}>
                  <UserStatus status={status} />
                </UserAvatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  {hasEmail && (
                    <span className="truncate text-xs">{email}</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>
                {t('user.dropdown.change_status.title')}
              </DropdownMenuLabel>

              <DropdownMenuItem onClick={changeUserStatus('ACTIVE')}>
                <UserStatus className="mr-2" status="ACTIVE" withoutPosition />
                {t('user.dropdown.change_status.active')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={changeUserStatus('IDLE')}>
                <UserStatus className="mr-2" status="IDLE" withoutPosition />
                {t('user.dropdown.change_status.idle')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={changeUserStatus('DO_NOT_DISTURB')}>
                <UserStatus
                  className="mr-2"
                  status="DO_NOT_DISTURB"
                  withoutPosition
                />
                {t('user.dropdown.change_status.do_not_disturb')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={changeUserStatus('OFFLINE')}>
                <UserStatus className="mr-2" status="OFFLINE" withoutPosition />
                {t('user.dropdown.change_status.offline')}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="1rem" />
              {t('auth.actions.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default SidebarUser
