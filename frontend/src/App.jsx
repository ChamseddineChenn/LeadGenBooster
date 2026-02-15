import { useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import UnderConstruction from './pages/UnderConstruction';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import About from './pages/About';
import QuiSommesNous from './pages/QuiSommesNous';
import NotreMission from './pages/NotreMission';
import NosValeurs from './pages/NosValeurs';
import NotreEquipe from './pages/NotreEquipe';
import NotreProcessus from './pages/NotreProcessus';
import Carrieres from './pages/Carrieres';
import Contact from './pages/Contact';

const App = () => {
  const [searchParams] = useSearchParams();

  // Initialize devMode from URL or localStorage
  useEffect(() => {
    const urlDevMode = searchParams.get('devMode') === 'true';
    if (urlDevMode) {
      localStorage.setItem('devMode', 'true');
    }
  }, [searchParams]);

  // Check localStorage for devMode
  const devMode = localStorage.getItem('devMode') === 'true';

  // If not in devMode, show under construction
  if (!devMode) {
    return (
      <div className="min-h-screen bg-white w-full">
        <UnderConstruction />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/about/notre-mission" element={<NotreMission />} />
          <Route path="/about/nos-valeurs" element={<NosValeurs />} />
          <Route path="/about/notre-equipe" element={<NotreEquipe />} />
          <Route path="/about/notre-processus" element={<NotreProcessus />} />
          <Route path="/about/carrieres" element={<Carrieres />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
