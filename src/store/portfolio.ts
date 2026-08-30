import { useEffect, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export type MediaKind = "image" | "video";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image: string;
  link?: string;
  featured?: boolean;
  status: "draft" | "published";
  order: number;
}

export interface MediaItem {
  id: string;
  kind: MediaKind;
  name: string;
  dataUrl: string;
  createdAt: number;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  icon: string; // lucide icon name
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface SiteSettings {
  brand: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  email: string;
  phone: string;
  instagram: string;
  youtube: string;
  discord: string;
}

export interface PortfolioState {
  projects: Project[];
  media: MediaItem[];
  services: Service[];
  skills: SkillGroup[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}

const ROW_ID = "main";

const uid = () => Math.random().toString(36).slice(2, 10);

const defaults: PortfolioState = {
  projects: [
    { id: "p1", title: "YouTube Thumbnail Design", category: "Graphic Design", description: "Click-worthy thumbnails engineered for retention and CTR across creator channels.", tools: ["Photoshop", "Figma"], image: p1, link: "#", featured: true, status: "published", order: 0 },
    { id: "p2", title: "Brand Poster Collection", category: "Graphic Design", description: "A curated series of bold poster designs that capture brand essence with minimal type.", tools: ["Illustrator", "Photoshop"], image: p2, link: "#", status: "published", order: 1 },
    { id: "p3", title: "Social Media Design Pack", category: "Social Media", description: "Cohesive Instagram post systems built for consistent brand storytelling.", tools: ["Figma", "Canva Pro"], image: p3, link: "#", status: "published", order: 2 },
    { id: "p4", title: "Video Editing Showcase", category: "Video Editing", description: "Cinematic edits with smooth pacing, sound design and dynamic transitions.", tools: ["Premiere Pro", "After Effects"], image: p4, link: "#", featured: true, status: "published", order: 3 },
    { id: "p5", title: "Creative Campaign Design", category: "Campaign", description: "End-to-end campaign visuals from concept boards to launch-ready assets.", tools: ["Photoshop", "Illustrator"], image: p5, link: "#", status: "published", order: 4 },
    { id: "p6", title: "AI Creative Experiments", category: "AI", description: "Exploring generative AI to push the boundaries of modern creative workflows.", tools: ["Midjourney", "Runway"], image: p6, link: "#", status: "published", order: 5 },
  ],
  media: [],
  services: [
    { id: "s1", icon: "Video", title: "Video Editing", desc: "Professional edits that improve storytelling and audience retention." },
    { id: "s2", icon: "Palette", title: "Graphic Design", desc: "Creative thumbnails, posters, banners and brand visuals." },
    { id: "s3", icon: "Share2", title: "Social Media Management", desc: "Content planning and digital presence management." },
    { id: "s4", icon: "Brain", title: "AI Creative Solutions", desc: "Using AI tools to improve creative workflow." },
  ],
  skills: [
    { id: "k1", icon: "Video", title: "Video Editing", items: ["Short form editing", "YouTube editing", "Creative storytelling"] },
    { id: "k2", icon: "Palette", title: "Graphic Design", items: ["YouTube thumbnails", "Posters & banners", "Branding designs", "Social media creatives"] },
    { id: "k3", icon: "Brain", title: "AI Tools", items: ["AI workflow", "AI creative tools", "Productivity systems"] },
    { id: "k4", icon: "Share2", title: "Social Media", items: ["Content planning", "Management", "Growth strategy"] },
  ],
  testimonials: [
    { id: "t1", name: "Rohan S.", role: "YouTube Creator", quote: "Abhinav's thumbnails doubled my CTR within a month. Truly world-class work." },
    { id: "t2", name: "Priya M.", role: "Brand Founder", quote: "The visual identity Abhinav delivered elevated our entire brand overnight." },
  ],
  settings: {
    brand: "ABHINAV GFX",
    tagline: "Content Creator · Graphic Designer · Video Editor",
    heroTitle: "Crafting bold visuals for modern creators",
    heroSubtitle: "Premium design, video and AI-powered creative work.",
    email: "abhinavnitingupta@gmail.com",
    phone: "",
    instagram: "https://instagram.com/abhinavgupta_yt",
    youtube: "https://youtube.com/@abhinavgupta_yt",
    discord: "abhinavnitingupta",
  },
};

let state: PortfolioState = defaults;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function merge(raw: unknown): PortfolioState {
  const parsed = (raw ?? {}) as Partial<PortfolioState>;
  return {
    ...defaults,
    ...parsed,
    settings: { ...defaults.settings, ...(parsed.settings || {}) },
  };
}

/** Load the live content from the cloud. Safe to call multiple times. */
export async function loadPortfolio(force = false) {
  if (loaded && !force) return;
  loaded = true;
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", ROW_ID)
    .maybeSingle();
  if (error) {
    console.error("Failed to load site content", error);
    return;
  }
  if (data?.data) {
    state = merge(data.data);
    emit();
  }
}

let saveTimer: ReturnType<typeof setTimeout> | undefined;
let saving = false;
const saveListeners = new Set<(s: boolean) => void>();

function setSaving(v: boolean) {
  saving = v;
  saveListeners.forEach((l) => l(v));
}

async function push() {
  setSaving(true);
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: ROW_ID, data: JSON.parse(JSON.stringify(state)) }, { onConflict: "id" });
  setSaving(false);
  if (error) {
    console.error("Failed to save site content", error);
    throw error;
  }
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    push().catch(() => {
      toast.error("Could not save changes to the cloud. Please sign in again.");
    });
  }, 500);
}

export const portfolioStore = {
  get: () => state,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  set: (updater: (s: PortfolioState) => PortfolioState) => {
    state = updater(state);
    emit();
    scheduleSave();
  },
  reset: () => {
    state = defaults;
    emit();
    scheduleSave();
  },
  isSaving: () => saving,
  onSavingChange: (l: (s: boolean) => void) => {
    saveListeners.add(l);
    return () => saveListeners.delete(l);
  },
  newId: uid,
};

export function usePortfolio(): PortfolioState {
  useEffect(() => {
    loadPortfolio();
  }, []);
  return useSyncExternalStore(portfolioStore.subscribe, portfolioStore.get, portfolioStore.get);
}
