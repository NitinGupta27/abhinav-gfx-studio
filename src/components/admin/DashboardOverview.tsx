import { usePortfolio } from "@/store/portfolio";
import { FolderKanban, Image as ImageIcon, Sparkles, Star, TrendingUp, Users } from "lucide-react";

export const DashboardOverview = () => {
  const { projects, media, services, skills, testimonials } = usePortfolio();
  const published = projects.filter((p) => p.status === "published").length;
  const featured = projects.filter((p) => p.featured).length;

  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderKanban, hint: `${published} published` },
    { label: "Featured", value: featured, icon: Star, hint: "on homepage" },
    { label: "Media Files", value: media.length, icon: ImageIcon, hint: "in library" },
    { label: "Services", value: services.length, icon: Sparkles, hint: "offerings" },
    { label: "Skills", value: skills.reduce((a, s) => a + s.items.length, 0), icon: TrendingUp, hint: `${skills.length} groups` },
    { label: "Testimonials", value: testimonials.length, icon: Users, hint: "client quotes" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold">Welcome back, Abhinav 👋</h2>
        <p className="text-muted-foreground mt-1">Here's what's happening across your creator brand.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={s.label} style={{ animationDelay: `${i * 60}ms` }} className="glass rounded-2xl p-5 relative overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mt-2">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.hint}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-blue">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <h3 className="font-display text-xl font-bold mb-4">Quick actions</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <a href="#projects-tab" className="glass rounded-xl p-4 hover:border-primary/50 transition">📁 Manage Projects</a>
          <a href="#media-tab" className="glass rounded-xl p-4 hover:border-primary/50 transition">🎬 Upload Media</a>
          <a href="/" target="_blank" className="glass rounded-xl p-4 hover:border-primary/50 transition">🚀 View Live Site</a>
        </div>
      </div>
    </div>
  );
};
