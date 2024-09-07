import { HTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import type { UserStore } from '~/features/user/stores/user';
import { cn } from '~/utils/classNames';
import { AvatarFallback, AvatarImage, Avatar as AvatarUI } from '~ui/avatar';

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  nameAcronym: string;
  avatar: UserStore['avatar'];
};

const Avatar = forwardRef<HTMLDivElement, PropsWithChildren<AvatarProps>>(
  ({ nameAcronym, avatar, children, className }, ref) => {
    return (
      <AvatarUI className={cn('h-10 w-10 overflow-visible', className)} ref={ref}>
        <AvatarImage src={avatar} className="overflow-hidden rounded-full" />
        <AvatarFallback>{nameAcronym}</AvatarFallback>
        {children}
      </AvatarUI>
    );
  },
);

export { Avatar };
