import * as React from 'react';
import { cva } from 'class-variance-authority';

const legendVariants = cva('text-sm font-medium ds-text-foreground', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

export const Fieldset = ({
  children,
  legend,
  legendSize,
  className,
  ...props
}: React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend?: React.ReactNode;
  legendSize?: 'sm' | 'md' | 'lg';
}) => (
  <fieldset
    className={[
      'flex flex-col gap-4 ds-radius-selected border border-border p-4',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {legend && (
      <legend className={legendVariants({ size: legendSize })}>{legend}</legend>
    )}
    {children}
  </fieldset>
);
