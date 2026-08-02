import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';

export function TabsDemo() {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList variant="default">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-2">
        <p className="text-sm ds-text-muted-foreground">Content for tab 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-2">
        <p className="text-sm ds-text-muted-foreground">Content for tab 2</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-2">
        <p className="text-sm ds-text-muted-foreground">Content for tab 3</p>
      </TabsContent>
    </Tabs>
  );
}

export function TabsPillsDemo() {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList variant="pills">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function TabsBareDemo() {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList variant="bare">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
