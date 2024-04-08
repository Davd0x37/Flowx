import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'app/components/ui/accordion';
import { Button, buttonVariants } from 'app/components/ui/button';
import { type SidebarItem, SidebarLinkList } from 'app/config/routes';
import { cn } from 'app/utils/classNames';

type Props = {};

type SidebarLinkProps = SidebarItem & { withoutIcon?: boolean };

export const SidebarLink = ({ path, name, withoutIcon, ...link }: SidebarLinkProps) => {
  const { t } = useTranslation('Routes');

  return (
    <Link to={path} className="block">
      <Button variant="ghost" className="w-full justify-start space-x-2  font-semibold">
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
            'w-full justify-between gap-2  font-semibold hover:no-underline',
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

const SidebarLinks = ({}: Props) => {
  return (
    <>
      {SidebarLinkList.map((link) =>
        link.isGroup ? (
          <SidebarGroup {...link} key={nanoid()}>
            {link.childrenList?.map((child) => <SidebarLink withoutIcon {...child} key={nanoid()} />)}
          </SidebarGroup>
        ) : (
          <SidebarLink {...link} key={nanoid()} />
        ),
      )}
    </>
  );
};

export default SidebarLinks;
