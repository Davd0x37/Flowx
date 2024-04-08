import { cn } from 'app/utils/classNames';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-primary/10 animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
