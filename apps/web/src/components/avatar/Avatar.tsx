import { type HTMLAttributes, type PropsWithChildren, forwardRef } from 'react'
import { AvatarFallback, AvatarImage, Avatar as AvatarUI } from '~/components/ui/avatar'
import { cn } from '~/lib/utils'
import type { UserStore } from '~/stores/user'

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  nameAcronym: string
  avatar: UserStore['avatar']
}

const Avatar = forwardRef<HTMLDivElement, PropsWithChildren<AvatarProps>>(
  ({ nameAcronym, avatar, children, className }, ref) => {
    return (
      <AvatarUI className={cn('h-10 w-10 overflow-visible', className)} ref={ref}>
        <AvatarImage src={avatar} className="overflow-hidden rounded-full" />
        <AvatarFallback>{nameAcronym}</AvatarFallback>
        {children}
      </AvatarUI>
    )
  },
)

export { Avatar }
