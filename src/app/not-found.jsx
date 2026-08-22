import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'

export const metadata = {
  title: 'Page not found | Dhatri Patel',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="section pt-36 sm:pt-44">
      <div className="shell">
        <Reveal className="rounded-card border border-line bg-surface p-9 text-center shadow-card sm:p-12">
          <p className="font-pixel text-5xl text-accent">404</p>
          <h1 className="mt-4 text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            <span className="font-light">Page </span>
            <span className="font-bold">not found</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
            That link does not point anywhere on this site. The case studies are all listed on the
            projects page.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ArrowButton href="/projects">View Projects</ArrowButton>
            <ArrowButton href="/" tone="outline">
              Back Home
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
