import Hero from './Hero';
import SocialProof from './SocialProof';
import ServicesOverview from './ServicesOverview';
import HowItWorks from './HowItWorks';
import DashboardPreview from './DashboardPreview';
import IndustriesWeServe from './IndustriesWeServe';
import PricingTeaser from './PricingTeaser';
import CaseStudies from './CaseStudies';
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
      <PricingTeaser />
      <CaseStudies />
      <CTASection />
    </div>
  );
};

export default Landing;
