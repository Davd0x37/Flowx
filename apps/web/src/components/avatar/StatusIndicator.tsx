import type { UserStatus } from '@flowx/api_types/models/user'
import { cva } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '~/lib/utils'

type IndicatorProps = {
  status: { [key in UserStatus]: string }
}

const indicatorClass = cva<IndicatorProps>(
  "overflow-visible block h-[12px] w-[12px] rounded-full content-[''] border border-solid border-background",
  {
    variants: {
      status: {
        active: 'bg-green-500',
        idle: 'bg-yellow-500',
        doNotDisturb: 'bg-red-500',
        offline: 'bg-gray-400',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  },
)

type Props = HTMLAttributes<HTMLDivElement> & {
  status: UserStatus
  withoutPosition?: boolean
}

const StatusIndicator = forwardRef<HTMLDivElement, Props>(
  ({ className, status, withoutPosition, ...props }, ref) => {
    const positionClass = withoutPosition ? 'relative' : 'absolute bottom-0 right-0'

    return (
      <div
        ref={ref}
        className={cn(indicatorClass({ status }), positionClass, className)}
        {...props}
      />
    )
  },
)

export { StatusIndicator }
