import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Fieldset } from '../components/Fieldset';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import { Switch } from '../components/Switch';
import { Checkbox } from '../components/Checkbox';
import { RadioGroup, RadioGroupItem } from '../components/RadioGroup';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/Select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '../components/Dialog';
import { Popover, PopoverTrigger, PopoverContent } from '../components/Popover';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../components/DropdownMenu';
import { Disclosure, DisclosureTrigger, DisclosureContent } from '../components/Disclosure';
import { Combobox, ComboboxTrigger, ComboboxInput, ComboboxContent, ComboboxItem } from '../components/Combobox';
import { Listbox, ListboxTrigger, ListboxContent, ListboxItem } from '../components/Listbox';
import { TabsDemo, TabsPillsDemo, TabsBareDemo } from './TabsDemos';

export default function ComponentsPage() {
  const [selectedCombobox, setSelectedCombobox] = useState<string | null>(null);
  const [selectedListbox, setSelectedListbox] = useState<string | null>(null);

  return (
    <div>
      <div className="grid gap-4">
        {/* Buttons */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Buttons</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Primary, secondary, outline, ghost, and destructive button variants in multiple sizes.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Inputs</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Text input with default, filled, and underlined variants.
          </p>
          <div className="mt-4 space-y-3">
            <Input placeholder="Default input" />
            <Input variant="filled" placeholder="Filled input" />
            <Input variant="underlined" placeholder="Underlined input" />
            <Input placeholder="Disabled input" disabled />
          </div>
        </div>

        {/* Textareas */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Textareas</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Textarea with default, filled, and underlined variants.
          </p>
          <div className="mt-4 space-y-3">
            <Textarea placeholder="Default textarea" />
            <Textarea variant="filled" placeholder="Filled textarea" />
            <Textarea variant="underlined" placeholder="Underlined textarea" />
            <Textarea placeholder="Disabled textarea" disabled />
          </div>
        </div>

        {/* Cards */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Cards</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Card component with header, body, and footer.
          </p>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="ds-text-muted-foreground">Card content goes here</p>
              </CardContent>
              <CardFooter>
                <Button variant="primary">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Form Controls */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Form Controls</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Switch, checkbox, and radio group examples.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="switch-demo" defaultChecked />
              <label htmlFor="switch-demo" className="text-sm ds-text-foreground">Switch</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="checkbox-demo" defaultChecked />
              <label htmlFor="checkbox-demo" className="text-sm ds-text-foreground">Checkbox</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroup defaultValue="1" className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="1" id="radio-1" />
                  <label htmlFor="radio-1" className="text-sm ds-text-foreground">Option 1</label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="2" id="radio-2" />
                  <label htmlFor="radio-2" className="text-sm ds-text-foreground">Option 2</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Fieldset */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Fieldset</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Fieldset with legend and grouped form controls.
          </p>
          <div className="mt-4">
            <Fieldset legend="User Information" legendSize="md">
              <div className="space-y-3">
                <Input placeholder="Name" />
                <Input placeholder="Email" type="email" autoComplete="email" />
              </div>
            </Fieldset>
          </div>
        </div>

        {/* Select */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Select</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Single-value selection from a list. Use when choosing one option from many.
          </p>
          <div className="mt-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Tabs</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Tabbed navigation with default, pills, and bare variants.
          </p>
          <div className="mt-4 space-y-4">
            <TabsDemo />
            <TabsPillsDemo />
            <TabsBareDemo />
          </div>
        </div>

        {/* Dialog */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Dialog</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Modal dialog with overlay, header, content, and footer.
          </p>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>Dialog description goes here</DialogDescription>
                </DialogHeader>
                <div>
                  <p className="text-sm ds-text-muted-foreground">Dialog content goes here</p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="primary">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Popover */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Popover</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Popover with trigger and content.
          </p>
          <div className="mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm ds-text-foreground">Popover content goes here</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Dropdown Menu</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Action menu with labels, separators, and destructive items. Use for command menus and action lists.
          </p>
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Disclosure */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Disclosure</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Collapsible disclosure section.
          </p>
          <div className="mt-4">
            <Disclosure>
              <DisclosureTrigger asChild>
                <Button variant="outline">Toggle Disclosure</Button>
              </DisclosureTrigger>
              <DisclosureContent className="mt-2">
                <p className="text-sm ds-text-muted-foreground">Disclosure content goes here</p>
              </DisclosureContent>
            </Disclosure>
          </div>
        </div>

        {/* Combobox */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Combobox</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Combobox with input and dropdown items.
          </p>
          <div className="mt-4">
            <Combobox>
              <ComboboxTrigger>
                <ComboboxInput placeholder="Select an option" />
              </ComboboxTrigger>
              <ComboboxContent>
                <ComboboxItem value="option1" selected={selectedCombobox === 'option1'} onClick={() => setSelectedCombobox('option1')}>Option 1</ComboboxItem>
                <ComboboxItem value="option2" selected={selectedCombobox === 'option2'} onClick={() => setSelectedCombobox('option2')}>Option 2</ComboboxItem>
                <ComboboxItem value="option3" selected={selectedCombobox === 'option3'} onClick={() => setSelectedCombobox('option3')}>Option 3</ComboboxItem>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        {/* Listbox */}
        <div className="rounded-lg border border-border bg-background p-6 ds-shadow-sm">
          <h3 className="text-base font-medium ds-font-heading">Listbox</h3>
          <p className="mt-1 text-xs ds-text-muted-foreground">
            Listbox with trigger and selectable items.
          </p>
          <div className="mt-4">
            <Listbox>
              <ListboxTrigger>Select an option</ListboxTrigger>
              <ListboxContent>
                <ListboxItem value="option1" selected={selectedListbox === 'option1'} onClick={() => setSelectedListbox('option1')}>Option 1</ListboxItem>
                <ListboxItem value="option2" selected={selectedListbox === 'option2'} onClick={() => setSelectedListbox('option2')}>Option 2</ListboxItem>
                <ListboxItem value="option3" selected={selectedListbox === 'option3'} onClick={() => setSelectedListbox('option3')}>Option 3</ListboxItem>
              </ListboxContent>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  );
}
