import * as Primitive from '@radix-ui/react-dialog';

export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogPortal = Primitive.Portal;

export const DialogOverlay = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Overlay>) => (
  <Primitive.Overlay
    className={[
      'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DialogContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Content>) => (
  <Primitive.Content
    className={[
      'fixed left-1/2 top-1/2 z-50 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 border border-border bg-background p-6 shadow-lg ds-radius-selected ds-shadow-lg overflow-y-auto overscroll-behavior-contain max-h-[calc(100vh-4rem)]',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
      'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={['flex flex-col space-y-1.5', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={['flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Title>) => (
  <Primitive.Title
    className={['text-lg font-semibold ds-text-foreground', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Primitive.Description>) => (
  <Primitive.Description
    className={['text-sm ds-text-muted-foreground', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);

export const DialogClose = Primitive.Close;
