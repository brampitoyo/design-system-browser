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
          <SystemSwitcher />
        </header>
        <nav className="flex-shrink-0 bg-neutral-800">
          <div className="px-3">
            <div className="flex gap-1 py-1.5">
              <button
                onClick={() => setView('primitives')}
                className={`px-1 py-0.5 text-xs ds-font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 ${
                  view === 'primitives'
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Primitives
              </button>
              <button
                onClick={() => setView('components')}
                className={`px-1 py-0.5 text-xs ds-font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 ${
                  view === 'components'
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Components
              </button>
            </div>
          </div>
        </nav>
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