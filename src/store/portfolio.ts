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

const ROW_ID = "main";

const uid = () => Math.random().toString(36).slice(2, 10);
