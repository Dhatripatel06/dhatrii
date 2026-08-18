import useSmoothScroll from './hooks/useSmoothScroll'
import GalaxyBackground from './components/ui/GalaxyBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Brands from './components/Brands'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Services from './components/Services'
import Tools from './components/Tools'
import WorkProcess from './components/WorkProcess'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()

  // No background on the wrapper below: an opaque ancestor would paint over
  // the fixed -z-10 starfield. The page ground comes from `body`.
  return (
    <div className="min-h-screen">
      <GalaxyBackground />
      <Header />
      <main id="main">
        <Hero />
        <Brands />
        <Journey />
        <Projects />
        <Experience />
        <Services />
        <Tools />
        <WorkProcess />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
