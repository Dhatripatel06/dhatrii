import { work, projects } from '@/data/content'
import ProjectCard from '@/components/ui/ProjectCard'
import TwoTone from '@/components/ui/TwoTone'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'

/**
 * Large stacked project cards: full-bleed image on top, then a title row with
 * lowercase tags and a circular arrow button, matching the reference. Each
 * card opens the case study at /projects/<slug>.
 */
export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section">
      <div className="shell">
        <TwoTone id="work-heading" light={work.titleLight} bold={work.titleBold} lede={work.lede} />

        {/* Sticky stack: each card pins a little lower than the one before it,
            so the next card slides up and covers the previous one. */}
        <ul className="mt-14 flex flex-col gap-8 sm:mt-16">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className="sticky"
              style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <ArrowButton href={work.cta.href}>{work.cta.label}</ArrowButton>
        </Reveal>
      </div>
    </section>
  )
}
