import heroVisual from "@/assets/hero-visual.jpg";
import { ArrowRight, Sparkles, Video, Palette, Brain, Share2 } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Available for new projects</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Hi, I'm <span className="text-gradient">Abhinav</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 font-medium">
              Content Creator <span className="text-muted-foreground mx-2">·</span> Graphic Designer <span className="text-muted-foreground mx-2">·</span> Video Editor
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              I create high-impact digital experiences through creative design, engaging content and powerful visuals that help brands stand out in the digital world.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-medium text-primary-foreground glow-blue hover:scale-[1.02] transition-transform">
                View My Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 font-medium hover:bg-card/60 transition">
                Let's Connect
              </a>
            </div>
            <div className="flex items-center gap-8 pt-6 border-t border-border/40">
              {[
                { v: "50+", l: "Projects" },
                { v: "2+", l: "Years" },
                { v: "100%", l: "Satisfaction" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-10 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-glow-pulse" />
            <div className="relative rounded-3xl overflow-hidden glass-strong p-2 shadow-card">
              <img
                src={heroVisual}
                alt="Abhinav GFX creative workspace"
                width={1024}
                height={1024}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* floating cards */}
            <div className="absolute -left-4 top-10 glass rounded-2xl p-3 animate-float shadow-card hidden sm:flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center"><Video className="h-4 w-4 text-primary" /></div>
              <div>
                <div className="text-xs font-semibold">Video Editing</div>
                <div className="text-[10px] text-muted-foreground">Cinematic edits</div>
              </div>
            </div>
            <div className="absolute -right-4 top-32 glass rounded-2xl p-3 animate-float shadow-card hidden sm:flex items-center gap-2" style={{ animationDelay: "1s" }}>
              <div className="h-9 w-9 rounded-lg bg-secondary/20 flex items-center justify-center"><Palette className="h-4 w-4 text-secondary" /></div>
              <div>
                <div className="text-xs font-semibold">Graphic Design</div>
                <div className="text-[10px] text-muted-foreground">Bold visuals</div>
              </div>
            </div>
            <div className="absolute -left-2 bottom-24 glass rounded-2xl p-3 animate-float shadow-card hidden sm:flex items-center gap-2" style={{ animationDelay: "2s" }}>
              <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center"><Brain className="h-4 w-4 text-primary" /></div>
              <div>
                <div className="text-xs font-semibold">AI Tools</div>
                <div className="text-[10px] text-muted-foreground">Smart workflow</div>
              </div>
            </div>
            <div className="absolute -right-2 bottom-10 glass rounded-2xl p-3 animate-float shadow-card hidden sm:flex items-center gap-2" style={{ animationDelay: "1.5s" }}>
              <div className="h-9 w-9 rounded-lg bg-secondary/20 flex items-center justify-center"><Share2 className="h-4 w-4 text-secondary" /></div>
              <div>
                <div className="text-xs font-semibold">Social Media</div>
                <div className="text-[10px] text-muted-foreground">Growth strategy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
