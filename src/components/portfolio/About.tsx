import { SectionHeading } from "./SectionHeading";
import { Trophy, Clock, Sparkles, Heart } from "lucide-react";

const stats = [
  { icon: Trophy, value: "50+", label: "Projects Completed" },
  { icon: Clock, value: "2+", label: "Years Experience" },
  { icon: Sparkles, value: "10+", label: "Creative Skills" },
  { icon: Heart, value: "100%", label: "Client Satisfaction" },
];

export const About = () => (
  <section id="about" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="About Me" title="Crafting Digital Stories" description="I'm Abhinav, a creative professional passionate about creating impactful digital experiences. I combine creativity, design thinking and modern tools to build visuals and content that connect with audiences." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {stats.map((s, i) => (
          <div key={s.label} className="group relative glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
            <div className="relative">
              <div className="h-11 w-11 rounded-xl bg-gradient-primary/20 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-blue transition-shadow">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
