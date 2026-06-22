import { SectionHeading } from "./SectionHeading";
import { Video, Palette, Brain, Share2 } from "lucide-react";

const skills = [
  { icon: Video, title: "Video Editing", items: ["Short form editing", "YouTube editing", "Creative storytelling"], color: "from-primary to-primary-glow" },
  { icon: Palette, title: "Graphic Design", items: ["YouTube thumbnails", "Posters & banners", "Branding designs", "Social media creatives"], color: "from-secondary to-primary" },
  { icon: Brain, title: "AI Tools", items: ["AI workflow", "AI creative tools", "Productivity systems"], color: "from-primary to-secondary" },
  { icon: Share2, title: "Social Media", items: ["Content planning", "Management", "Growth strategy"], color: "from-secondary to-primary-glow" },
];

export const Skills = () => (
  <section id="skills" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="Skills & Expertise" title="What I Do Best" description="A toolkit refined through years of hands-on creative work across video, design and emerging AI workflows." />
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((s) => (
          <div key={s.title} className="group relative glass rounded-3xl p-8 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
            <div className="relative">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} mb-5 group-hover:scale-110 transition-transform`}>
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">{s.title}</h3>
              <ul className="space-y-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
