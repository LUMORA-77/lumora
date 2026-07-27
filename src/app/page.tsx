import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Gallery />
      <Features />
      <Showcase />
      <Testimonials />
    </main>
  );
}