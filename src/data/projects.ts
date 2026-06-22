import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export interface Project {
  title: string;
  description: string;
  tools: string[];
  image: string;
  link?: string;
}

// Edit this array to update the portfolio gallery.
export const projects: Project[] = [
  {
    title: "YouTube Thumbnail Design",
    description: "Click-worthy thumbnails engineered for retention and CTR across creator channels.",
    tools: ["Photoshop", "Figma"],
    image: p1,
    link: "#",
  },
  {
    title: "Brand Poster Collection",
    description: "A curated series of bold poster designs that capture brand essence with minimal type.",
    tools: ["Illustrator", "Photoshop"],
    image: p2,
    link: "#",
  },
  {
    title: "Social Media Design Pack",
    description: "Cohesive Instagram post systems built for consistent brand storytelling.",
    tools: ["Figma", "Canva Pro"],
    image: p3,
    link: "#",
  },
  {
    title: "Video Editing Showcase",
    description: "Cinematic edits with smooth pacing, sound design and dynamic transitions.",
    tools: ["Premiere Pro", "After Effects"],
    image: p4,
    link: "#",
  },
  {
    title: "Creative Campaign Design",
    description: "End-to-end campaign visuals from concept boards to launch-ready assets.",
    tools: ["Photoshop", "Illustrator"],
    image: p5,
    link: "#",
  },
  {
    title: "AI Creative Experiments",
    description: "Exploring generative AI to push the boundaries of modern creative workflows.",
    tools: ["Midjourney", "Runway"],
    image: p6,
    link: "#",
  },
];
