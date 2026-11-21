import { Reveal, SectionHeading } from './Words'

export function About() {
  return (
    <section id="about" className="container-x py-28 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-2">
        <SectionHeading lead="About us." title="A small studio with big-company standards." />
        <div className="flex flex-col gap-10">
          <Reveal>
            <p className="text-lg leading-relaxed text-soft sm:text-xl">
              We keep the team small on purpose, so you always talk to the people building your product. We'd rather ship one
              thing properly than five things halfway, and we write everything down so your team can run it after we hand over.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-5 rounded-3xl border border-line bg-surface p-6">
              <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" className="h-16 w-16 shrink-0 rounded-2xl" />
              <div>
                <p className="text-lg font-semibold">Akash Tureha</p>
                <p className="text-muted">Founder, AKNEXUS Technologies</p>
                <p className="mt-2 border-b border-dashed border-muted text-sm text-soft">
                  Two or three sentences about you go here.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
