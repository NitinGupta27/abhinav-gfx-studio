import { useMemo, useRef, useState } from "react";
import { portfolioStore, usePortfolio, Project } from "@/store/portfolio";
import { Plus, Trash2, ArrowUp, ArrowDown, Star, Eye, EyeOff, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(file);
  });

export const ProjectsManager = () => {
  const { projects } = usePortfolio();
  const [editing, setEditing] = useState<Project | null>(null);
  const sorted = useMemo(() => [...projects].sort((a, b) => a.order - b.order), [projects]);

  const create = () => {
    setEditing({
      id: portfolioStore.newId(),
      title: "",
      category: "",
      description: "",
      tools: [],
      image: "",
      link: "",
      featured: false,
      status: "draft",
      order: projects.length,
    });
  };

  const save = (p: Project) => {
    portfolioStore.set((s) => {
      const exists = s.projects.some((x) => x.id === p.id);
      return { ...s, projects: exists ? s.projects.map((x) => (x.id === p.id ? p : x)) : [...s.projects, p] };
    });
    toast.success("Project saved");
    setEditing(null);
  };

  const remove = (id: string) => {
    portfolioStore.set((s) => ({ ...s, projects: s.projects.filter((p) => p.id !== id) }));
    toast.success("Project deleted");
  };

  const move = (id: string, dir: -1 | 1) => {
    portfolioStore.set((s) => {
      const arr = [...s.projects].sort((a, b) => a.order - b.order);
      const i = arr.findIndex((p) => p.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return s;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...s, projects: arr.map((p, idx) => ({ ...p, order: idx })) };
    });
  };

  const toggle = (id: string, field: "featured" | "status") => {
    portfolioStore.set((s) => ({
      ...s,
      projects: s.projects.map((p) => {
        if (p.id !== id) return p;
        if (field === "featured") return { ...p, featured: !p.featured };
        return { ...p, status: p.status === "published" ? "draft" : "published" };
      }),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Projects</h2>
          <p className="text-sm text-muted-foreground">Manage your featured portfolio work</p>
        </div>
        <button onClick={create} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium glow-blue hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      <div className="grid gap-3">
        {sorted.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start hover:border-primary/40 transition">
            <div className="h-24 w-full md:w-32 rounded-xl overflow-hidden bg-muted shrink-0">
              {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-muted-foreground"><ImageIcon className="h-6 w-6" /></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold truncate">{p.title || "Untitled"}</h3>
                {p.featured && <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-gradient-primary text-primary-foreground">Featured</span>}
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${p.status === "published" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{p.category}</div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => move(p.id, -1)} className="p-2 rounded-lg glass hover:border-primary/50" title="Move up"><ArrowUp className="h-4 w-4" /></button>
              <button onClick={() => move(p.id, 1)} className="p-2 rounded-lg glass hover:border-primary/50" title="Move down"><ArrowDown className="h-4 w-4" /></button>
              <button onClick={() => toggle(p.id, "featured")} className={`p-2 rounded-lg glass hover:border-primary/50 ${p.featured ? "text-primary" : ""}`} title="Featured"><Star className="h-4 w-4" /></button>
              <button onClick={() => toggle(p.id, "status")} className="p-2 rounded-lg glass hover:border-primary/50" title="Publish/Draft">{p.status === "published" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</button>
              <button onClick={() => setEditing(p)} className="px-3 py-2 rounded-lg glass hover:border-primary/50 text-sm">Edit</button>
              <button onClick={() => remove(p.id)} className="p-2 rounded-lg glass hover:border-destructive/50 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && <ProjectEditor initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
};

const ProjectEditor = ({ initial, onSave, onClose }: { initial: Project; onSave: (p: Project) => void; onClose: () => void }) => {
  const [p, setP] = useState<Project>(initial);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (f: File) => {
    if (f.size > 3 * 1024 * 1024) return toast.error("Image too large (max 3MB)");
    setP({ ...p, image: await fileToDataUrl(f) });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up">
      <div className="glass-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">{initial.title ? "Edit Project" : "New Project"}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Title"><input value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} className={inputCls} /></Field>
          <Field label="Category"><input value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })} className={inputCls} /></Field>
        </div>
        <Field label="Description"><textarea value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} rows={3} className={inputCls} /></Field>
        <Field label="Tools (comma separated)">
          <input value={p.tools.join(", ")} onChange={(e) => setP({ ...p, tools: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} className={inputCls} />
        </Field>
        <Field label="Link"><input value={p.link || ""} onChange={(e) => setP({ ...p, link: e.target.value })} className={inputCls} placeholder="https://" /></Field>

        <Field label="Cover Image">
          <div className="flex items-center gap-3">
            {p.image && <img src={p.image} alt="" className="h-16 w-24 object-cover rounded-lg" />}
            <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass hover:border-primary/50 text-sm"><Upload className="h-4 w-4" /> Upload</button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </div>
        </Field>

        <div className="flex flex-wrap gap-4 pt-2">
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={!!p.featured} onChange={(e) => setP({ ...p, featured: e.target.checked })} /> Featured
          </label>
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={p.status === "published"} onChange={(e) => setP({ ...p, status: e.target.checked ? "published" : "draft" })} /> Published
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl glass hover:border-primary/50">Cancel</button>
          <button onClick={() => onSave(p)} className="flex-1 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold glow-blue">Save Project</button>
        </div>
      </div>
    </div>
  );
};

const inputCls = "w-full px-3 py-2.5 rounded-lg bg-input/60 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition text-sm";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</span>
    {children}
  </label>
);
export { inputCls, Field, fileToDataUrl };
