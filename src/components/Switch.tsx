import * as Primitive from '@radix-ui/react-switch';

export const Switch = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Root>) => (
  <Primitive.Root
    className={[
      'relative h-6 w-11 shrink-0 rounded-full ds-border ds-shadow-sm ds-switch',
       // Switches are always fully rounded per accessibility guidelines — do not use ds-radius-selected
      'focus-visible:outline-none focus-visible:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=unchecked]:bg-muted',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <Primitive.Thumb
      className={[
        'block h-5 w-5 rounded-full bg-white shadow-lg transition-transform',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  </Primitive.Root>
);
