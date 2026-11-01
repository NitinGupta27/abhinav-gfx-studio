// ============= Full file contents =============
import { SectionHeading } from "./SectionHeading";
import { Trophy, Clock, Sparkles, Heart } from "lucide-react";
import { usePortfolio } from "@/store/portfolio";

const STAT_ICONS = [Trophy, Clock, Sparkles, Heart];

export const About = () => {
  const { settings } = usePortfolio();
  const stats = settings.stats ?? [];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeading eyebrow="About Me" title={settings.aboutTitle} description={settings.aboutText} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <div key={s.label} className="group relative glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-gradient-primary/20 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-blue transition-shadow">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="font-display text-3xl font-bold text-gradient mb-1">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
