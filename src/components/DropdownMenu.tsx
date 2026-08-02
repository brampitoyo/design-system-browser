import * as Primitive from '@radix-ui/react-dropdown-menu';
import { cva } from 'class-variance-authority';

const menuItemVariants = cva(
  'relative flex w-full cursor-default select-none items-center ds-radius-selected px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus:ds-bg-accent-selected focus:ds-text-accent-selected data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ds-font-body',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'text-destructive focus-visible:text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuGroup = Primitive.Group;
export const DropdownMenuPortal = Primitive.Portal;
export const DropdownMenuSub = Primitive.Sub;
export const DropdownMenuRadioGroup = Primitive.RadioGroup;

export const DropdownMenuContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Content>) => (
  <Primitive.Portal>
    <Primitive.Content
      className={[
        'z-50 min-w-[8rem] overflow-hidden ds-radius-selected border border-border bg-background p-1 ds-shadow-md overscroll-behavior-contain',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  </Primitive.Portal>
);

export const DropdownMenuItem = ({
  variant,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Item> & {
  variant?: 'default' | 'destructive';
}) => (
  <Primitive.Item
    className={menuItemVariants({ variant, className })}
    {...props}
  />
);

export const DropdownMenuLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Label>) => (
  <Primitive.Label
    className={['px-2 py-1.5 text-sm font-semibold ds-text-foreground', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Separator>) => (
  <Primitive.Separator
    className={['-mx-1 my-1 h-px bg-border', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={['ml-auto text-xs ds-text-muted-foreground', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
