import { useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { MediaManager } from "@/components/admin/MediaManager";
import { ServicesManager, SkillsManager, TestimonialsManager, SettingsManager } from "@/components/admin/Managers";
import { isAuthed, logout } from "@/lib/auth";
import { LayoutDashboard, FolderKanban, Image, Sparkles, Wrench, MessageSquareQuote, Settings, LogOut, ExternalLink, Menu, X } from "lucide-react";

type Tab = "overview" | "projects" | "media" | "services" | "skills" | "testimonials" | "settings";

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "media", label: "Media", icon: Image },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "settings", label: "Settings", icon: Settings },
];

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setAuthed(isAuthed()); }, []);

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  const doLogout = () => { logout(); setAuthed(false); };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-screen w-72 glass-strong border-r border-white/10 transition-transform flex flex-col`}>
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary glow-blue flex items-center justify-center font-bold text-primary-foreground">A</div>
              <div>
                <div className="font-display font-bold text-gradient">ABHINAV GFX</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Creator CMS</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV.map((n) => {
              const active = tab === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => { setTab(n.id); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${active ? "bg-gradient-primary text-primary-foreground glow-blue" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"}`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-white/10 space-y-1">
            <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-white/5 text-muted-foreground hover:text-foreground transition">
              <ExternalLink className="h-4 w-4" /> View Live Site
            </a>
            <button onClick={doLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </aside>

        {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden" />}

        {/* Main */}
        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-20 glass-strong border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg glass"><Menu className="h-5 w-5" /></button>
            <div className="flex-1 md:flex-none">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Section</div>
              <div className="font-display text-lg font-bold capitalize">{tab}</div>
            </div>
            {mobileOpen && <button onClick={() => setMobileOpen(false)} className="md:hidden p-2 rounded-lg glass"><X className="h-5 w-5" /></button>}
          </header>

          <div key={tab} className="p-4 md:p-8 animate-fade-in-up">
            {tab === "overview" && <DashboardOverview />}
            {tab === "projects" && <ProjectsManager />}
            {tab === "media" && <MediaManager />}
            {tab === "services" && <ServicesManager />}
            {tab === "skills" && <SkillsManager />}
            {tab === "testimonials" && <TestimonialsManager />}
            {tab === "settings" && <SettingsManager />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
