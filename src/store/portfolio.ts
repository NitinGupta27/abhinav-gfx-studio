import { useSyncExternalStore } from "react";
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

const KEY = "abhinavgfx.portfolio.v1";

const uid = () => Math.random().toString(36).slice(2, 10);

const defaults: PortfolioState = {
  projects: [
    { id: uid(), title: "YouTube Thumbnail Design", category: "Graphic Design", description: "Click-worthy thumbnails engineered for retention and CTR across creator channels.", tools: ["Photoshop", "Figma"], image: p1, link: "#", featured: true, status: "published", order: 0 },
    { id: uid(), title: "Brand Poster Collection", category: "Graphic Design", description: "A curated series of bold poster designs that capture brand essence with minimal type.", tools: ["Illustrator", "Photoshop"], image: p2, link: "#", status: "published", order: 1 },
    { id: uid(), title: "Social Media Design Pack", category: "Social Media", description: "Cohesive Instagram post systems built for consistent brand storytelling.", tools: ["Figma", "Canva Pro"], image: p3, link: "#", status: "published", order: 2 },
    { id: uid(), title: "Video Editing Showcase", category: "Video Editing", description: "Cinematic edits with smooth pacing, sound design and dynamic transitions.", tools: ["Premiere Pro", "After Effects"], image: p4, link: "#", featured: true, status: "published", order: 3 },
    { id: uid(), title: "Creative Campaign Design", category: "Campaign", description: "End-to-end campaign visuals from concept boards to launch-ready assets.", tools: ["Photoshop", "Illustrator"], image: p5, link: "#", status: "published", order: 4 },
    { id: uid(), title: "AI Creative Experiments", category: "AI", description: "Exploring generative AI to push the boundaries of modern creative workflows.", tools: ["Midjourney", "Runway"], image: p6, link: "#", status: "published", order: 5 },
  ],
  media: [],
  services: [
    { id: uid(), icon: "Video", title: "Video Editing", desc: "Professional edits that improve storytelling and audience retention." },
    { id: uid(), icon: "Palette", title: "Graphic Design", desc: "Creative thumbnails, posters, banners and brand visuals." },
    { id: uid(), icon: "Share2", title: "Social Media Management", desc: "Content planning and digital presence management." },
    { id: uid(), icon: "Brain", title: "AI Creative Solutions", desc: "Using AI tools to improve creative workflow." },
  ],
  skills: [
    { id: uid(), icon: "Video", title: "Video Editing", items: ["Short form editing", "YouTube editing", "Creative storytelling"] },
    { id: uid(), icon: "Palette", title: "Graphic Design", items: ["YouTube thumbnails", "Posters & banners", "Branding designs", "Social media creatives"] },
    { id: uid(), icon: "Brain", title: "AI Tools", items: ["AI workflow", "AI creative tools", "Productivity systems"] },
    { id: uid(), icon: "Share2", title: "Social Media", items: ["Content planning", "Management", "Growth strategy"] },
  ],
  testimonials: [
    { id: uid(), name: "Rohan S.", role: "YouTube Creator", quote: "Abhinav's thumbnails doubled my CTR within a month. Truly world-class work." },
    { id: uid(), name: "Priya M.", role: "Brand Founder", quote: "The visual identity Abhinav delivered elevated our entire brand overnight." },
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

let state: PortfolioState = load();
const listeners = new Set<() => void>();

function load(): PortfolioState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed, settings: { ...defaults.settings, ...(parsed.settings || {}) } };
  } catch {
    return defaults;
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("portfolio persist failed", e);
  }
  listeners.forEach((l) => l());
}

export const portfolioStore = {
  get: () => state,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  set: (updater: (s: PortfolioState) => PortfolioState) => {
    state = updater(state);
    persist();
  },
  reset: () => {
    state = defaults;
    persist();
  },
  newId: uid,
};

export function usePortfolio(): PortfolioState {
  return useSyncExternalStore(portfolioStore.subscribe, portfolioStore.get, portfolioStore.get);
}
