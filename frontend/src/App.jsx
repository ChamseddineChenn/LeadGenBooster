import { useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import UnderConstruction from './pages/UnderConstruction';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import QuiSommesNous from './pages/QuiSommesNous';
import NotreMission from './pages/NotreMission';
import NosValeurs from './pages/NosValeurs';
import NotreEquipe from './pages/NotreEquipe';
import NotreProcessus from './pages/NotreProcessus';
import Carrieres from './pages/Carrieres';
import CareerDetail from './pages/CareerDetail';
import Contact from './pages/Contact';
import NewsletterConfirm from './pages/NewsletterConfirm';
import NewsletterUnsubscribe from './pages/NewsletterUnsubscribe';

// Service Sub-pages
import CreationGraphique from './pages/services/CreationGraphique';
import DeveloppementWeb from './pages/services/DeveloppementWeb';
import GestionReseauxSociaux from './pages/services/GestionReseauxSociaux';
import RedactionContenuSEO from './pages/services/RedactionContenuSEO';
import ProspectionCommercialeB2B from './pages/services/ProspectionCommercialeB2B';
import PriseRDVQualifies from './pages/services/PriseRDVQualifies';
import RelanceClientsInactifs from './pages/services/RelanceClientsInactifs';
import FormationCommerciale from './pages/services/FormationCommerciale';

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

  // Allow newsletter routes regardless of devMode
  const isNewsletterRoute = window.location.pathname.startsWith('/newsletter/');

  // If not in devMode and not on newsletter route, show under construction
  if (!devMode && !isNewsletterRoute) {
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
          <Route
            path="/services/creation-graphique"
            element={<CreationGraphique />}
          />
          <Route
            path="/services/developpement-web"
            element={<DeveloppementWeb />}
          />
          <Route
            path="/services/gestion-reseaux-sociaux"
            element={<GestionReseauxSociaux />}
          />
          <Route
            path="/services/redaction-contenu-seo"
            element={<RedactionContenuSEO />}
          />
          <Route
            path="/services/prospection-commerciale-b2b"
            element={<ProspectionCommercialeB2B />}
          />
          <Route
            path="/services/prise-rdv-qualifies"
            element={<PriseRDVQualifies />}
          />
          <Route
            path="/services/relance-clients-inactifs"
            element={<RelanceClientsInactifs />}
          />
          <Route
            path="/services/formation-commerciale"
            element={<FormationCommerciale />}
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/about/notre-mission" element={<NotreMission />} />
          <Route path="/about/nos-valeurs" element={<NosValeurs />} />
          <Route path="/about/notre-equipe" element={<NotreEquipe />} />
          <Route path="/about/notre-processus" element={<NotreProcessus />} />
          <Route path="/about/carrieres" element={<Carrieres />} />
          <Route path="/carrieres" element={<Carrieres />} />
          <Route path="/carrieres/:slug" element={<CareerDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter/confirmer" element={<NewsletterConfirm />} />
          <Route
            path="/newsletter/desabonner"
            element={<NewsletterUnsubscribe />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
