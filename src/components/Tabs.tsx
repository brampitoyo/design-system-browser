import * as Primitive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';

const tabsListVariants = cva('inline-flex ds-font-body', {
  variants: {
    variant: {
      default: 'h-10 items-center border-b border-border',
      pills: 'h-10 items-center gap-1 ds-radius-selected bg-muted p-1',
      bare: 'h-10 items-center gap-4',
    },
  },
  defaultVariants: { variant: 'default' },
});

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 ds-tabs-trigger',
  {
    variants: {
      variant: {
        default:
          'border-b-2 border-transparent text-muted-foreground hover:text-foreground',
        pills:
          'ds-radius-selected text-muted-foreground hover:text-foreground data-[state=active]:shadow-sm',
        bare:
          'border-b-2 border-transparent text-muted-foreground hover:text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const Tabs = Primitive.Root;
export const TabsList = ({
  variant,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.List> & {
  variant?: 'default' | 'pills' | 'bare';
}) => (
  <Primitive.List
    className={tabsListVariants({ variant, className })}
    {...props}
  />
);
export const TabsTrigger = ({
  variant,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Trigger> & {
  variant?: 'default' | 'pills' | 'bare';
}) => (
  <Primitive.Trigger
    className={tabTriggerVariants({ variant, className })}
    {...props}
  />
);
export const TabsContent = Primitive.Content;
