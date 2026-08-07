import { useState, lazy, Suspense } from 'react';
import { DesignSystemProvider } from './context/DesignSystemContext';
import { SystemSwitcher } from './components/SystemSwitcher';

import './styles/systems/tailwind.css';
import './styles/systems/carbon.css';
import './styles/systems/primer.css';
import './styles/systems/pajamas.css';
import './styles/systems/material.css';
import './styles/systems/lightning.css';
import './styles/systems/atlassian.css';
import './styles/systems/overrides.css';
import './styles/systems/radix.css';
import './styles/systems/chakra.css';

const PrimitivesPage = lazy(() => import('./pages/PrimitivesPage'));
const ComponentsPage = lazy(() => import('./pages/ComponentsPage'));

type View = 'primitives' | 'components';

function App() {
  const [view, setView] = useState<View>('primitives');

  return (
    <DesignSystemProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
        <header className="flex-shrink-0">
          <SystemSwitcher view={view} setView={setView} />
        </header>
        <main className="flex-1 mx-auto max-w-6xl px-4 py-4 w-full">
          {view === 'primitives' && (
            <Suspense fallback={<div className="p-4">Loading primitives…</div>}>
              <PrimitivesPage />
            </Suspense>
          )}
          {view === 'components' && (
            <Suspense fallback={<div className="p-4">Loading components…</div>}>
              <ComponentsPage />
            </Suspense>
          )}
        </main>
      </div>
    </DesignSystemProvider>
  );
}

export default App;