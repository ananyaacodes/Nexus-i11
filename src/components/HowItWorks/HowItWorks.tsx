// Change the duration here once organizers confirm it.
const DURATION = "48 Hours";

// All phase text lives in this list. To change a phase, edit one line.
// Add a date (for example date: "11 Oct, 7:00 PM") once organizers confirm.
const PHASES: { title: string; detail: string; date?: string }[] = [
  { title: "Kickoff", detail: "Meet the NGOs, hear the problems and form your crew." },
  { title: "Build", detail: "Prototype day and night with mentors on hand." },
  { title: "Demo", detail: "Pitch your solution to judges, partners and communities." },
  { title: "Awards", detail: "Winners announced and ideas handed over to the NGOs." },
];

export default function HowItWorks() {
  return (
    <section
      id="timeline"
      className="bg-[#07080a] px-6 py-24 text-white md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#f59e0b]">
          Timeline · Schedule
        </p>
        <h2 className="mb-14 mt-4 text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[1.05]">
          {DURATION}, Start To Finish
        </h2>

        {/* Vertical on mobile, horizontal on desktop */}
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {PHASES.map((phase, index) => (
            <li
              key={phase.title}
              className="relative border-l border-white/10 pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-6"
            >
              <span className="absolute -left-[7px] top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#f59e0b] bg-[#07080a] md:-top-[7px] md:left-0" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                Phase {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-bold uppercase">{phase.title}</h3>
              <p className="mt-2 text-sm text-white/60">{phase.detail}</p>
              {phase.date && (
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-white/40">
                  {phase.date}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}