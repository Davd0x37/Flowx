import type { HTMLAttributes, PropsWithChildren } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~ui/avatar'
import type { UserStore } from '~/stores/user'
import { cn } from '~/lib/utils'

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  avatar: UserStore['avatar']
  nameAcronym: string
}

function UserAvatar({
  avatar,
  children,
  className,
  nameAcronym,
  ref,
}: PropsWithChildren<AvatarProps> & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <Avatar className={cn('h-10 w-10 overflow-visible', className)} ref={ref}>
      <AvatarImage className="overflow-hidden rounded-full" src={avatar} />
      <AvatarFallback>{nameAcronym}</AvatarFallback>
      {children}
    </Avatar>
  )
}

export default UserAvatar
