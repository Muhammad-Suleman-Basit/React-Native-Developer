import BackgroundFX from '@/components/BackgroundFX';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <BackgroundFX />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
