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

export const Combobox = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);

export const ComboboxTrigger = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props}>{children}</button>
);

export const ComboboxInput = ({
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

export const ComboboxContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={[
      'z-50 min-w-[8rem] overflow-hidden ds-radius-selected border border-border bg-background p-1 ds-shadow-md',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </div>
);

export const ComboboxItem = ({
  value,
  selected,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string; selected?: boolean }) => (
  <button
    type="button"
    data-value={value}
    data-state={selected ? 'selected' : undefined}
    className={[
      'relative flex w-full appearance-none bg-transparent border-0 p-0 text-left select-none items-center ds-radius-selected py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus-visible:ring-2 ds-selectable-item',
      'data-[state=selected]:bg-[var(--accent-selected-bg)] data-[state=selected]:text-[var(--accent-selected-fg)]',
      'hover:bg-muted hover:text-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </button>
);
