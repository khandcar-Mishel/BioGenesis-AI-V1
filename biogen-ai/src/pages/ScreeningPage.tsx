import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScreeningHero from '../components/screening/ScreeningHero';
import ScreeningBenefits from '../components/screening/ScreeningBenefits';
import ScreeningTools from '../components/screening/ScreeningTools';
import ScreeningProcess from '../components/screening/ScreeningProcess';
import ScreeningCTA from '../components/screening/ScreeningCTA';

export default function ScreeningPage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-screen-bg font-sans selection:bg-screen-green-light">
      <Navbar />
      
      <main className="pt-[72px]">
        <ScreeningHero />
        <ScreeningBenefits />
        <ScreeningTools />
        <ScreeningProcess />
        <ScreeningCTA />
      </main>
      
      <Footer />
    </div>
  );
}
