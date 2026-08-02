import { cva } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-10 w-full ds-radius-selected border border-border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ds-font-body ds-border-accent-focus',
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

export const Input = ({
  variant,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'filled' | 'underlined';
}) => (
  <input
    className={inputVariants({ variant, className })}
    {...props}
  />
);
