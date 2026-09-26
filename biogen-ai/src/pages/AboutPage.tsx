import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutTeam from '../components/about/AboutTeam';
import AboutContact from '../components/about/AboutContact';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-about-green/20">
      <Navbar />
      <main className="pt-[72px]">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
}
