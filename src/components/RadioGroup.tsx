import * as Primitive from '@radix-ui/react-radio-group';

export const RadioGroup = Primitive.Root;
export const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Item>) => (
  <Primitive.Item
    className={[
      'h-5 w-5 shrink-0 rounded-full ds-border ds-shadow-sm ds-radio',
       // Radio buttons are always fully rounded per accessibility guidelines — do not use ds-radius-selected
      'focus-visible:outline-none focus-visible:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=unchecked]:ds-border data-[state=unchecked]:bg-background',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <Primitive.Indicator className="flex h-full w-full items-center justify-center">
      <div className="h-2 w-2 rounded-full ds-text-accent-button" />
    </Primitive.Indicator>
  </Primitive.Item>
);
