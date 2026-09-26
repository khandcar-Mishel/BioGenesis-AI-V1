import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MDHero from '../components/md/MDHero';
import MDWhySection from '../components/md/MDWhySection';
import MDHowItWorks from '../components/md/MDHowItWorks';
import MDAnalysisOutputs from '../components/md/MDAnalysisOutputs';
import MDApplications from '../components/md/MDApplications';
import MDCTA from '../components/md/MDCTA';

export default function MDSimulationPage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-md-bg font-sans selection:bg-md-mint">
      <Navbar />
      
      <main className="pt-[72px]">
        <MDHero />
        <MDWhySection />
        <MDHowItWorks />
        <MDAnalysisOutputs />
        <MDApplications />
        <MDCTA />
      </main>
      
      <Footer />
    </div>
  );
}
