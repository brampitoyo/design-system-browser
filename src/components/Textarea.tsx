import { cva } from 'class-variance-authority';

const textareaVariants = cva(
  'flex w-full ds-radius-selected border border-border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ds-font-body ds-border-accent-focus',
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

export const Textarea = ({
  variant,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'default' | 'filled' | 'underlined';
}) => (
  <textarea
    className={textareaVariants({ variant, className })}
    {...props}
  />
);
