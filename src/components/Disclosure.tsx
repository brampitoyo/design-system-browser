import * as Primitive from '@radix-ui/react-collapsible';

export const Disclosure = Primitive.Root;
export const DisclosureTrigger = Primitive.Trigger;

export const DisclosureContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Content>) => (
  <Primitive.Content
    className={[
      'overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
