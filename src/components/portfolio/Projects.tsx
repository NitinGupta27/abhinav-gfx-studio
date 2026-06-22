import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { projects } from "@/data/projects";

export const Projects = () => (
  <section id="projects" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="Selected Work" title="Featured Projects" description="A glimpse into recent work spanning design, video and creative campaigns." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article key={p.title} className="group relative glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-display text-xl font-bold group-hover:text-gradient transition">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {p.tools.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">{t}</span>
                ))}
              </div>
              <a href={p.link || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground pt-2 hover:text-primary transition">
                View Project
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
