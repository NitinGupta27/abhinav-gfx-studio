import { portfolioStore, usePortfolio, Service, SkillGroup, Testimonial } from "@/store/portfolio";
import { Plus, Trash2 } from "lucide-react";
import { inputCls, Field, fileToDataUrl } from "./ProjectsManager";
import { toast } from "sonner";
import { useRef } from "react";

const ICON_OPTS = ["Video", "Palette", "Share2", "Brain", "Sparkles", "Camera", "Wand2", "Rocket"];

export const ServicesManager = () => {
  const { services } = usePortfolio();
  const add = () => portfolioStore.set((s) => ({ ...s, services: [...s.services, { id: portfolioStore.newId(), title: "New Service", desc: "", icon: "Sparkles" }] }));
  const update = (id: string, patch: Partial<Service>) =>
    portfolioStore.set((s) => ({ ...s, services: s.services.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
  const remove = (id: string) => portfolioStore.set((s) => ({ ...s, services: s.services.filter((x) => x.id !== id) }));

  return (
    <ManagerShell title="Services" subtitle="Offerings shown on the portfolio" onAdd={add}>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="glass rounded-2xl p-5 space-y-3">
            <div className="flex gap-3">
              <select value={s.icon} onChange={(e) => update(s.id, { icon: e.target.value })} className={inputCls + " w-32"}>
                {ICON_OPTS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <input value={s.title} onChange={(e) => update(s.id, { title: e.target.value })} className={inputCls} placeholder="Title" />
              <button onClick={() => remove(s.id)} className="p-2 rounded-lg glass hover:border-destructive/50 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            <textarea value={s.desc} onChange={(e) => update(s.id, { desc: e.target.value })} rows={2} className={inputCls} placeholder="Description" />
          </div>
        ))}
      </div>
    </ManagerShell>
  );
};

export const SkillsManager = () => {
  const { skills } = usePortfolio();
  const add = () => portfolioStore.set((s) => ({ ...s, skills: [...s.skills, { id: portfolioStore.newId(), title: "New Skill", icon: "Sparkles", items: [] }] }));
  const update = (id: string, patch: Partial<SkillGroup>) =>
    portfolioStore.set((s) => ({ ...s, skills: s.skills.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
  const remove = (id: string) => portfolioStore.set((s) => ({ ...s, skills: s.skills.filter((x) => x.id !== id) }));

  return (
    <ManagerShell title="Skills" subtitle="Grouped expertise displayed on the portfolio" onAdd={add}>
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div key={s.id} className="glass rounded-2xl p-5 space-y-3">
            <div className="flex gap-3">
              <select value={s.icon} onChange={(e) => update(s.id, { icon: e.target.value })} className={inputCls + " w-32"}>
                {ICON_OPTS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <input value={s.title} onChange={(e) => update(s.id, { title: e.target.value })} className={inputCls} placeholder="Group title" />
              <button onClick={() => remove(s.id)} className="p-2 rounded-lg glass hover:border-destructive/50 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            <textarea
              value={s.items.join("\n")}
              onChange={(e) => update(s.id, { items: e.target.value.split("\n").map((v) => v.trim()).filter(Boolean) })}
              rows={4}
              className={inputCls}
              placeholder="One item per line"
            />
          </div>
        ))}
      </div>
    </ManagerShell>
  );
};

export const TestimonialsManager = () => {
  const { testimonials } = usePortfolio();
  const add = () =>
    portfolioStore.set((s) => ({ ...s, testimonials: [...s.testimonials, { id: portfolioStore.newId(), name: "New Client", role: "", quote: "" }] }));
  const update = (id: string, patch: Partial<Testimonial>) =>
    portfolioStore.set((s) => ({ ...s, testimonials: s.testimonials.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
  const remove = (id: string) => portfolioStore.set((s) => ({ ...s, testimonials: s.testimonials.filter((x) => x.id !== id) }));

  const uploadAvatar = async (id: string, f: File) => {
    if (f.size > 1024 * 1024) return toast.error("Avatar too large (max 1MB)");
    update(id, { avatar: await fileToDataUrl(f) });
  };

  return (
    <ManagerShell title="Testimonials" subtitle="Client kind words displayed on the portfolio" onAdd={add}>
      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} t={t} onUpdate={(p) => update(t.id, p)} onRemove={() => remove(t.id)} onAvatar={(f) => uploadAvatar(t.id, f)} />
        ))}
      </div>
    </ManagerShell>
  );
};

const TestimonialCard = ({ t, onUpdate, onRemove, onAvatar }: { t: Testimonial; onUpdate: (p: Partial<Testimonial>) => void; onRemove: () => void; onAvatar: (f: File) => void }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => ref.current?.click()} className="h-11 w-11 rounded-full bg-gradient-primary overflow-hidden shrink-0 flex items-center justify-center font-bold">
          {t.avatar ? <img src={t.avatar} alt="" className="h-full w-full object-cover" /> : t.name.charAt(0)}
        </button>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onAvatar(e.target.files[0])} />
        <input value={t.name} onChange={(e) => onUpdate({ name: e.target.value })} className={inputCls} placeholder="Name" />
        <button onClick={onRemove} className="p-2 rounded-lg glass hover:border-destructive/50 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
      </div>
      <input value={t.role} onChange={(e) => onUpdate({ role: e.target.value })} className={inputCls} placeholder="Role / Company" />
      <textarea value={t.quote} onChange={(e) => onUpdate({ quote: e.target.value })} rows={3} className={inputCls} placeholder="Quote" />
    </div>
  );
};

export const SettingsManager = () => {
  const { settings } = usePortfolio();
  const update = (patch: Partial<typeof settings>) =>
    portfolioStore.set((s) => ({ ...s, settings: { ...s.settings, ...patch } }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">Global brand details and contact info</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Brand"><input className={inputCls} value={settings.brand} onChange={(e) => update({ brand: e.target.value })} /></Field>
        <Field label="Tagline"><input className={inputCls} value={settings.tagline} onChange={(e) => update({ tagline: e.target.value })} /></Field>
        <Field label="Hero Title"><input className={inputCls} value={settings.heroTitle} onChange={(e) => update({ heroTitle: e.target.value })} /></Field>
        <Field label="Hero Subtitle"><input className={inputCls} value={settings.heroSubtitle} onChange={(e) => update({ heroSubtitle: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} value={settings.email} onChange={(e) => update({ email: e.target.value })} /></Field>
        <Field label="Phone"><input className={inputCls} value={settings.phone} onChange={(e) => update({ phone: e.target.value })} /></Field>
        <Field label="Instagram"><input className={inputCls} value={settings.instagram} onChange={(e) => update({ instagram: e.target.value })} /></Field>
        <Field label="YouTube"><input className={inputCls} value={settings.youtube} onChange={(e) => update({ youtube: e.target.value })} /></Field>
        <Field label="Discord"><input className={inputCls} value={settings.discord} onChange={(e) => update({ discord: e.target.value })} /></Field>
      </div>
      <div className="pt-4 flex gap-3">
        <button
          onClick={() => {
            if (confirm("Reset all portfolio data to defaults? This cannot be undone.")) {
              portfolioStore.reset();
              toast.success("Data reset");
            }
          }}
          className="px-4 py-2.5 rounded-xl glass hover:border-destructive/50 hover:text-destructive text-sm"
        >
          Reset all data
        </button>
      </div>
    </div>
  );
};

const ManagerShell = ({ title, subtitle, onAdd, children }: { title: string; subtitle: string; onAdd: () => void; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <button onClick={onAdd} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium glow-blue"><Plus className="h-4 w-4" /> Add</button>
    </div>
    {children}
  </div>
);
