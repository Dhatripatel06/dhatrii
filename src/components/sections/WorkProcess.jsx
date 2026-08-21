import { Search, Map, PenTool, Rocket } from 'lucide-react'
import { workProcess } from '@/data/content'
import TwoTone from '@/components/ui/TwoTone'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'

const ICONS = { Search, Map, PenTool, Rocket }

/**
 * Four process cards in a 2-up grid. Each carries an accent icon badge and a
 * ghost pixel numeral on top, with the step name in a nested inset box below —
 * the reference's card anatomy.
 */
export default function WorkProcess() {
  return (
    <section id="process" aria-labelledby="process-heading" className="section">
      <div className="shell">
        <TwoTone
          id="process-heading"
          light={workProcess.titleLight}
          bold={workProcess.titleBold}
          lede={workProcess.lede}
        />

        {/* Cards are a fixed ~308px wide and the grid centres them: one column
            until there is room for two, never stretched to fill. */}
        <Stagger className="mx-auto mt-14 grid max-w-[39.75rem] grid-cols-1 justify-items-center gap-5 md:grid-cols-2">
          {workProcess.steps.map((step) => {
            const Icon = ICONS[step.icon] ?? Search
            return (
              <StaggerItem key={step.number} as="article" className="h-full w-full max-w-[19.25rem]">
                <div className="flex h-full flex-col rounded-card border border-line bg-surface p-4">
                  {/* Badge + ghost numeral */}
                  <div className="flex items-start justify-between gap-4 px-3 pb-5 pt-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-bg">
                      <Icon size={19} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="select-none font-pixel text-6xl font-bold leading-none text-white/[0.16] sm:text-7xl"
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Inset title box */}
                  <div className="mt-auto rounded-[22px] border border-line bg-white/[0.03] px-5 py-4">
                    <h3 className="font-display text-lg font-semibold leading-snug sm:text-xl">
                      {step.title[0]}
                      <br />
                      {step.title[1]}
                    </h3>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
