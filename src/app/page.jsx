import JsonLd from '@/components/JsonLd'
import {
  faqSchema,
  personSchema,
  professionalServiceSchema,
  webSiteSchema,
} from '@/lib/schema'
import Brands from '@/components/sections/Brands'
import ClientsSay from '@/components/sections/ClientsSay'
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
      {/* The identity graph lives here rather than in the layout: stamping a
          Person onto every case study describes the wrong entity for that page.
          FAQPage is here and only here, because the FAQ accordion it mirrors is
          rendered on this page and nowhere else. */}
      <JsonLd
        schema={[webSiteSchema(), personSchema(), professionalServiceSchema({ includePricing: true }), faqSchema()]}
      />

      <Hero />
      <Brands />
      <Journey />
      <Projects />
      <Experience />
      <Services />
      <Tools />
      <WorkProcess />
      <Testimonials />
      {/* Immediately before pricing: a real endorsement is the last thing read
          before the numbers. Renders nothing until an approved quote exists. */}
      <ClientsSay />
      <Pricing />
      <FAQ />
      <Contact />
      <Closing />
    </>
  )
}
