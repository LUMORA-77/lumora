import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden">

      <Hero />

      <Gallery />

      <Features />

      <Showcase />

      <Testimonials />

      <Footer />

    </main>
  );
}