import { HTMLAttributes, forwardRef } from 'react';
import { TUserStatus } from '@/features/user/stores/user';
import { cn } from '@/utils/classNames';
import { cva } from 'class-variance-authority';

type IndicatorProps = {
  status: { [key in TUserStatus]: string };
};

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
);

type Props = HTMLAttributes<HTMLDivElement> & {
  status: TUserStatus;
  withoutPosition?: boolean;
};

const StatusIndicator = forwardRef<HTMLDivElement, Props>(
  ({ className, status, withoutPosition, ...props }, ref) => {
    const positionClass = withoutPosition ? 'relative' : 'absolute bottom-0 right-0';

    return (
      <div
        ref={ref}
        className={cn(indicatorClass({ status }), positionClass, className)}
        {...props}
      />
    );
  },
);

export { StatusIndicator };
