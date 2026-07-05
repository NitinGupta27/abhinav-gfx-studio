import { SectionHeading } from "./SectionHeading";
import { Quote } from "lucide-react";
import { usePortfolio } from "@/store/portfolio";

export const Testimonials = () => {
  const { testimonials } = usePortfolio();
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeading eyebrow="Kind Words" title="What Clients Say" description="Trusted by creators and brands to elevate their visual identity." />
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass rounded-3xl p-8 relative hover:border-primary/40 transition-all duration-500 hover:-translate-y-1">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/30" />
              <p className="text-lg leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
