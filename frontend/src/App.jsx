import { useSearchParams } from 'react-router-dom';
import UnderConstruction from './pages/UnderConstruction';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';

const App = () => {
  const [searchParams] = useSearchParams();
  const devMode = searchParams.get('devMode') === 'true';

  return (
    <div className="min-h-screen bg-white w-full">
      {devMode ? (
        <>
          <Navbar />
          <Landing />
        </>
      ) : (
        <UnderConstruction />
      )}
    </div>
  );
};

export default App;
