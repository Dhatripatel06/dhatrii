import { projects, projectsIndex, projectPage } from '@/data/content'
import ProjectCard from '@/components/ui/ProjectCard'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import TwoTone from '@/components/ui/TwoTone'

export const metadata = {
  title: `${projectsIndex.meta.title} | Dhatri Patel`,
  description: projectsIndex.meta.description,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `${projectsIndex.meta.title} | Dhatri Patel`,
    description: projectsIndex.meta.description,
    url: '/projects',
  },
}

/**
 * Index of every case study. Same card as the home section, listed plainly
 * instead of sticky-stacked so the whole set reads at a glance.
 */
export default function ProjectsIndexPage() {
  return (
    <>
      {/* Extra top padding clears the fixed header, which the home page gets
          from its hero instead. */}
      <section className="section pt-36 sm:pt-44" aria-labelledby="projects-heading">
        <div className="shell">
          <Reveal className="flex justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectsIndex.eyebrow}
            </p>
          </Reveal>

          <TwoTone
            id="projects-heading"
            className="mt-5"
            light={projectsIndex.titleLight}
            bold={projectsIndex.titleBold}
            lede={projectsIndex.lede}
          />

          <ul className="mt-14 flex flex-col gap-8 sm:mt-16">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <ProjectCard project={project} eager={index === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-surface p-9 text-center shadow-card sm:p-12">
            <h2 className="text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="font-light">{projectPage.cta.titleLight} </span>
              <span className="font-bold">{projectPage.cta.titleBold}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">{projectPage.cta.lede}</p>
            <div className="mt-8 flex justify-center">
              <ArrowButton href={projectPage.cta.href} target="_blank" rel="noopener noreferrer">
                {projectPage.cta.label}
              </ArrowButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
