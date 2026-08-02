import * as Primitive from '@radix-ui/react-popover';

export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;

export const PopoverContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Content>) => (
  <Primitive.Portal>
    <Primitive.Content
      className={[
        'z-50 w-72 ds-radius-selected border border-border bg-background p-4 ds-shadow-md ds-radius-selected overscroll-behavior-contain',
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

export const PopoverAnchor = Primitive.Anchor;
