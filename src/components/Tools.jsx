import { tools } from '../data/content'
import TwoTone from './ui/TwoTone'
import { Stagger, StaggerItem } from './ui/Stagger'

/**
 * Tool grid using the reference's squircle cards — a tall rounded shape with
 * the mark on top and name/role beneath, lighting up on hover.
 */
export default function Tools() {
  return (
    <section aria-labelledby="tools-heading" className="section">
      <div className="shell">
        <TwoTone
          id="tools-heading"
          light={tools.titleLight}
          bold={tools.titleBold}
          lede={tools.lede}
        />

        {/* Capsule cards, wrapped and centred so a short final row sits in
            the middle rather than flush left. */}
        <Stagger className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-5">
          {tools.items.map((tool) => (
            <StaggerItem key={tool.name} className="w-[136px] sm:w-[150px]">
              <div className="group flex aspect-[2/3] flex-col items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 text-center transition-colors duration-500 hover:border-accent/50">
                <span
                  aria-hidden="true"
                  className="mb-4 text-4xl leading-none transition-transform duration-500 motion-safe:group-hover:scale-110"
                  style={{ color: tool.color }}
                >
                  {tool.mark}
                </span>
                <span className="font-display font-bold">{tool.name}</span>
                <span className="text-[0.82rem] text-muted">{tool.role}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
