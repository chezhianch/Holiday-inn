import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <RoomsSection />
        <AmenitiesSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
