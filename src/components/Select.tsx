import * as Primitive from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';

const triggerVariants = cva(
  'flex h-10 w-full items-center justify-between ds-radius-selected border border-border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ds-font-body ds-border-accent-focus',
  {
    variants: {
      variant: {
        default: 'border-border bg-background',
        filled: 'border-transparent bg-muted',
        underlined: 'border-0 border-b-2 border-border rounded-none bg-transparent px-0',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const Select = Primitive.Root;
export const SelectTrigger = ({
  variant,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Trigger> & {
  variant?: 'default' | 'filled' | 'underlined';
}) => (
  <Primitive.Trigger
    className={triggerVariants({ variant, className })}
    {...props}
  >
    {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ml-2 shrink-0 text-muted-foreground"
        aria-hidden="true"
      >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Primitive.Trigger>
);
export const SelectContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Content>) => (
  <Primitive.Portal>
    <Primitive.Content
      className={[
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background ds-shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  </Primitive.Portal>
);
export const SelectItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Item>) => (
  <Primitive.Item
    className={[
      'relative flex w-full cursor-default select-none items-center ds-radius-selected py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus-visible:ring-2',
      'focus:ds-bg-accent-selected focus:ds-text-accent-selected',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
export const SelectValue = Primitive.Value;
