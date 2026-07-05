import { SectionHeading } from "./SectionHeading";
import { ArrowRight, Video, Palette, Share2, Brain, Sparkles, Camera, Wand2, Rocket, LucideIcon } from "lucide-react";
import { usePortfolio } from "@/store/portfolio";

const ICONS: Record<string, LucideIcon> = { Video, Palette, Share2, Brain, Sparkles, Camera, Wand2, Rocket };

export const Services = () => {
  const { services } = usePortfolio();
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeading eyebrow="Services" title="How I Can Help" description="Premium creative services tailored for brands, creators and modern teams." />
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <div key={s.id} className="group relative glass rounded-3xl p-8 flex gap-5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />
                <div className="relative shrink-0 h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center glow-blue">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="relative flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  </div>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-sm text-primary mt-4 hover:gap-2.5 transition-all">
                    Get started <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
