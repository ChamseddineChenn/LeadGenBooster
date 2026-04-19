import Hero from './Hero';
import SocialProof from './SocialProof';
import ServicesOverview from './ServicesOverview';
import HowItWorks from './HowItWorks';
import DashboardPreview from './DashboardPreview';
import IndustriesWeServe from './IndustriesWeServe';
// import CaseStudies from './CaseStudies';
import Packs from './Packs';
import CTASection from './CTASection';

const Landing = () => {
  return (
    <div>
      <Hero />
      <SocialProof />
      <ServicesOverview />
      <HowItWorks />
      <DashboardPreview />
      <IndustriesWeServe />
      {/* <CaseStudies /> */}
      <Packs />
      <CTASection />
    </div>
  );
};

export default Landing;
