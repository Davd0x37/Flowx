import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@/utils/classNames';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import { buttonVariants } from '@ui/button';

type SidebarGroupProps = HTMLAttributes<HTMLButtonElement> & {
  GroupTrigger: ReactNode;
};

const SidebarGroup = forwardRef<HTMLButtonElement, SidebarGroupProps>(
  ({ GroupTrigger, children, className }, ref) => {
    return (
      <Accordion type="single" collapsible className="space-y-8">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger
            ref={ref}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'hover:bg-primary/70 w-full justify-start gap-2 px-4 py-5 font-semibold hover:no-underline',
              // Move svg icon to the right
              '[&>svg:last-child]:ml-auto',
              className,
            )}
          >
            {GroupTrigger}
          </AccordionTrigger>
          <AccordionContent className="mt-2 space-y-2 pb-0 pl-8">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
);

export { SidebarGroup };
