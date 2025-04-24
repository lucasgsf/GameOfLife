import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const GameOfLife = lazy(() => import('./components/GameOfLife'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GameOfLife />
    </Suspense>
  );
}

export default App;