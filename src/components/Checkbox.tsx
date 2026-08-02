import * as Primitive from '@radix-ui/react-checkbox';

export const Checkbox = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Root>) => (
  <Primitive.Root
    className={[
      'group h-5 w-5 shrink-0 ds-radius-selected ds-border ds-shadow-sm ds-checkbox',
      'focus-visible:outline-none focus-visible:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=unchecked]:bg-transparent',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <Primitive.Indicator className="flex h-full w-full items-center justify-center">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="text-current"
        aria-hidden="true"
      >
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Primitive.Indicator>
  </Primitive.Root>
);
