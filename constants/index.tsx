import {
  IconLayoutDashboard,
  IconDropletHalf2,
  IconColorFilter,
  IconBackground,
} from "@tabler/icons-react";

export const SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    label: "Generative Fill",
    href: "/generative-fill",
    icon: IconDropletHalf2,
  },
  {
    label: "Recolor",
    href: "/recolor",
    icon: IconColorFilter,
  },
  {
    label: "Background Removal",
    href: "/background-remove",
    icon: IconBackground,
  },
];

export const aspectRatiosOptions = [
  {
    name: "Square",
    ratio: "1:1",
    dimensions: { width: 1080, height: 1080 },
    usage: "Social media posts, profile pictures, icons",
  },
  {
    name: "Standard",
    ratio: "4:3",
    dimensions: { width: 1024, height: 768 },
    usage:
      "Traditional television screens, older computer monitors, digital cameras",
  },
  {
    name: "Widescreen",
    ratio: "16:9",
    dimensions: { width: 1920, height: 1080 },
    usage: "Modern televisions, computer monitors, smartphones, YouTube videos",
  },
  {
    name: "Ultra-Widescreen",
    ratio: "21:9",
    dimensions: { width: 2560, height: 1080 },
    usage: "Ultra-wide monitors, cinematic content",
  },
  {
    name: "Classic Photography",
    ratio: "3:2",
    dimensions: { width: 1200, height: 800 },
    usage: "35mm film cameras, photography prints",
  },
  {
    name: "Widescreen Alternative",
    ratio: "16:10",
    dimensions: { width: 1280, height: 800 },
    usage: "Computer monitors, creative professionals, productivity",
  },
  {
    name: "Nearly Square",
    ratio: "5:4",
    dimensions: { width: 1280, height: 1024 },
    usage: "Older computer monitors, specific display applications",
  },
  {
    name: "Portrait Photography",
    ratio: "2:3",
    dimensions: { width: 800, height: 1200 },
    usage: "Portrait orientation photography, print formats",
  },
  {
    name: "Vertical Video",
    ratio: "9:16",
    dimensions: { width: 1080, height: 1920 },
    usage: "Mobile video content, Instagram Stories, TikTok, Snapchat",
  },
  {
    name: "CinemaScope",
    ratio: "2.39:1",
    dimensions: { width: 1920, height: 804 },
    usage: "Widescreen movies, cinematic feel",
  },
];
