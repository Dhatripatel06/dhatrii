import Brands from '@/components/sections/Brands'
import Closing from '@/components/sections/Closing'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import FAQ from '@/components/sections/FAQ'
import Hero from '@/components/sections/Hero'
import Journey from '@/components/sections/Journey'
import Pricing from '@/components/sections/Pricing'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Tools from '@/components/sections/Tools'
import WorkProcess from '@/components/sections/WorkProcess'

export default function HomePage() {
  return (
    <>
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
    </>
  )
}
