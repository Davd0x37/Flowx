import SidebarLinks from './SidebarLinks';
import { useTranslation } from 'react-i18next';
import { Logout } from '@/assets/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import useUserStore from '@/stores/user';
import { TUserStatus } from '@/types/user';
import { cn } from '@/utils/classNames';
import { cva } from 'class-variance-authority';
import { getAcronyms } from '@flowx/shared/utils/string';

type Props = {
  className: string;
  openSidebar?: boolean;
};

const statusClass = cva<{ status: { [key in TUserStatus]: string } }>(
  "overflow-visible after:absolute after:bottom-0 after:right-0 after:block after:h-[12px] after:w-[12px] after:rounded-full after:content-[''] after:border after:border-solid after:border-background",
  {
    variants: {
      status: {
        active: 'after:bg-green-500',
        idle: 'after:bg-yellow-500',
        doNotDisturb: 'after:bg-red-500',
        offline: 'after:bg-gray-400',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  },
);

const Sidebar = ({ className, openSidebar = false }: Props) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const userStore = useUserStore();
  const { name, avatar, status } = userStore;
  const { data: nameAcronym } = getAcronyms(name);

  return (
    <div
      className={cn(
        'border-e-border bg-background absolute z-10 flex h-full w-full max-w-[320px] -translate-x-full flex-col gap-4 border-e px-4 py-6 transition-transform md:relative [&.open]:translate-x-0',
        className,
        openSidebar && 'open',
      )}
    >
      <div className="routes max-h-[70%] space-y-2 overflow-auto">
        <SidebarLinks />
      </div>

      <div className="sidebarActions mt-auto">
        <div className="mb-4 flex flex-row items-center gap-3 pl-2 font-semibold">
          <Avatar className={cn('h-10 w-10', statusClass({ status }))}>
            <AvatarImage src={avatar} />
            <AvatarFallback>{nameAcronym}</AvatarFallback>
          </Avatar>

          <p className="text-sm">{name}</p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start space-x-2 font-semibold"
          onClick={auth.logout}
        >
          <Logout fontSize="1.25rem" />
          <p>{t('Logout', { ns: 'User' })}</p>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
