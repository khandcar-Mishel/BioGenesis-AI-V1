import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RFHero from "../components/rfdiffusion/RFHero";
import RFWhy from "../components/rfdiffusion/RFWhy";
import RFHowItWorks from "../components/rfdiffusion/RFHowItWorks";
import RFCapabilities from "../components/rfdiffusion/RFCapabilities";
import RFDeveloper from "../components/rfdiffusion/RFDeveloper";
import RFCTA from "../components/rfdiffusion/RFCTA";

export default function RFdiffusionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base font-sans selection:bg-bio-green-light">
      <Navbar />
      
      <main className="flex-1 pt-[68px]">
        <RFHero />
        <RFWhy />
        <RFHowItWorks />
        <RFCapabilities />
        <RFDeveloper />
        <RFCTA />
      </main>

      <Footer />
    </div>
  );
}
