import { PropsWithChildren, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import { type SidebarItem, SidebarLinkList } from '@/config/routes';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import { cn } from '@/utils/classNames';

type SidebarLinkProps = SidebarItem & { withoutIcon?: boolean };

export const SidebarLink = ({ path, name, withoutIcon, ...link }: SidebarLinkProps) => {
  const { t } = useTranslation('Routes');

  return (
    <Link to={path} className="block">
      <Button variant="ghost" className="w-full justify-start space-x-2 font-semibold">
        {!withoutIcon && link.icon ? <link.icon fontSize="1.25rem" /> : ''}
        <p>{t(name)}</p>
      </Button>
    </Link>
  );
};

export const SidebarGroup = ({ children, name, ...link }: PropsWithChildren<SidebarItem>) => {
  const { t } = useTranslation('Routes');

  return (
    <Accordion type="single" collapsible className="space-y-8">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full justify-between gap-2 font-semibold hover:no-underline',
            // Fix first svg icon rotation
            '[&[data-state=open]>svg:first-child]:rotate-0 [&[data-state=open]>svg]:rotate-180',
          )}
        >
          {link.icon ? <link.icon fontSize="1.25rem" /> : ''}
          <p className="mr-auto">{t(name)}</p>
        </AccordionTrigger>
        <AccordionContent className="mt-2 space-y-2 pl-8">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const SidebarLinks = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {SidebarLinkList.map((link) =>
        link.isGroup ? (
          <SidebarGroup {...link} key={useId()}>
            {link.childrenList?.map((child) => {
              if (child.disableIfAuthenticated && isAuthenticated) return null;
              return <SidebarLink withoutIcon {...child} key={useId()} />;
            })}
          </SidebarGroup>
        ) : link.disableIfAuthenticated && isAuthenticated ? null : (
          <SidebarLink {...link} key={useId()} />
        ),
      )}
    </>
  );
};

export default SidebarLinks;
