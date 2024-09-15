import { getAcronyms } from '@flowx/shared/utils/string'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Logout } from '~/assets/icons'
import { Avatar } from '~/components/avatar/Avatar'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useAuth } from '~/hooks/useAuth'
import { cn } from '~/lib/utils'
import useUserStore from '~/stores/user'
import { StatusIndicator } from '../avatar/StatusIndicator'

type ProfileProps = HTMLAttributes<HTMLDivElement>

const Profile = ({ className }: PropsWithChildren<ProfileProps>) => {
  const { t } = useTranslation()
  const auth = useAuth()
  const { name, avatar, status, changeStatus } = useUserStore()
  const { data: nameAcronym = '' } = getAcronyms(name)

  const statusActions = {
    active: () => {
      changeStatus('active')
    },
    idle: () => {
      changeStatus('idle')
    },
    doNotDisturb: () => {
      changeStatus('doNotDisturb')
    },
    offline: () => {
      changeStatus('offline')
    },
  }

  return (
    <div className={cn('flex w-full flex-row gap-4', className)}>
      {/* Avatar with status change dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar nameAcronym={nameAcronym} avatar={avatar}>
            <StatusIndicator status={status} />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-[250px]">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t('user:dropdown.change_status.title')}</DropdownMenuLabel>

            <DropdownMenuItem onClick={statusActions.active}>
              <StatusIndicator withoutPosition status="active" className="mr-2" />
              {t('user:dropdown.change_status.active')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={statusActions.idle}>
              <StatusIndicator withoutPosition status="idle" className="mr-2" />
              {t('user:dropdown.change_status.idle')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={statusActions.doNotDisturb}>
              <StatusIndicator withoutPosition status="doNotDisturb" className="mr-2" />
              {t('user:dropdown.change_status.do_not_disturb')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={statusActions.offline}>
              <StatusIndicator withoutPosition status="offline" className="mr-2" />
              {t('user:dropdown.change_status.offline')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User details */}
      <div className="flex flex-col justify-center">
        <p className="text-primary text-md font-semibold">{name}</p>
        {typeof auth.user.email === 'string' && (
          <p className="text-xs text-gray-500">{auth.user.email}</p>
        )}
      </div>

      {/* Logout button */}
      <div className="ml-auto flex items-center">
        <Button variant="ghost" size="sm" onClick={auth.logout}>
          <Logout fontSize="1rem" />
        </Button>
      </div>
    </div>
  )
}

export { Profile }
