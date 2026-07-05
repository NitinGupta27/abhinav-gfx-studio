import { useRef } from "react";
import { portfolioStore, usePortfolio } from "@/store/portfolio";
import { Upload, Trash2, ImageIcon, Video as VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { fileToDataUrl } from "./ProjectsManager";

export const MediaManager = () => {
  const { media } = usePortfolio();
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | null, kind: "image" | "video") => {
    if (!files) return;
    for (const f of Array.from(files)) {
      const max = kind === "video" ? 15 : 3;
      if (f.size > max * 1024 * 1024) {
        toast.error(`${f.name} too large (max ${max}MB)`);
        continue;
      }
      const dataUrl = await fileToDataUrl(f);
      portfolioStore.set((s) => ({
        ...s,
        media: [{ id: portfolioStore.newId(), kind, name: f.name, dataUrl, createdAt: Date.now() }, ...s.media],
      }));
    }
    toast.success("Uploaded");
  };

  const remove = (id: string) => {
    portfolioStore.set((s) => ({ ...s, media: s.media.filter((m) => m.id !== id) }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Media Library</h2>
          <p className="text-sm text-muted-foreground">Upload images and videos for use across the site</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => imgRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:border-primary/50 text-sm"><ImageIcon className="h-4 w-4" /> Upload Image</button>
          <button onClick={() => vidRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground glow-blue text-sm"><Upload className="h-4 w-4" /> Upload Video</button>
          <input ref={imgRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files, "image")} />
          <input ref={vidRef} type="file" accept="video/*" multiple className="hidden" onChange={(e) => upload(e.target.files, "video")} />
        </div>
      </div>

      {media.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
          <ImageIcon className="h-10 w-10 mx-auto mb-3 opacity-50" />
          No media yet. Upload images or videos to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((m) => (
            <div key={m.id} className="group relative glass rounded-2xl overflow-hidden hover:border-primary/40 transition">
              <div className="aspect-square bg-muted">
                {m.kind === "image" ? (
                  <img src={m.dataUrl} alt={m.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center relative">
                    <video src={m.dataUrl} className="h-full w-full object-cover" muted />
                    <VideoIcon className="absolute h-10 w-10 text-white/80 drop-shadow" />
                  </div>
                )}
              </div>
              <div className="p-2.5 text-xs truncate">{m.name}</div>
              <button onClick={() => remove(m.id)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/70 backdrop-blur hover:bg-destructive/80 opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
