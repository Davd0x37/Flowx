import type { UserStatus as UserStatusType } from '@flowx/api'
import type { HTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

type IndicatorProps = {
  status: { [key in UserStatusType]: string }
}

const indicatorClass = cva<IndicatorProps>(
  'overflow-visible block h-[12px] w-[12px] rounded-full content-[""] border border-solid border-background',
  {
    defaultVariants: {
      status: 'OFFLINE',
    },
    variants: {
      status: {
        ACTIVE: 'bg-green-500',
        DO_NOT_DISTURB: 'bg-red-500',
        IDLE: 'bg-yellow-500',
        OFFLINE: 'bg-gray-400',
      },
    },
  },
)

type Props = HTMLAttributes<HTMLDivElement> & {
  status: UserStatusType
  withoutPosition?: boolean
}

function UserStatus({
  className,
  ref,
  status,
  withoutPosition,
  ...props
}: Props & { ref?: React.RefObject<HTMLDivElement> }) {
  const positionClass = withoutPosition
    ? 'relative'
    : 'absolute bottom-0 right-0'

  return (
    <div
      className={cn(indicatorClass({ status }), positionClass, className)}
      ref={ref}
      {...props}
    />
  )
}

export default UserStatus
