import {
  IconBackground,
  IconColorFilter,
  IconLayoutDashboard,
  IconSparkles
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
    icon: IconSparkles,
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
    key: "0",
    name: "Standard",
    ratio: "4:3",
    dimensions: { width: 1024, height: 768 },
  },
  {
    key: "1",
    name: "Widescreen",
    ratio: "16:9",
    dimensions: { width: 1920, height: 1080 },
  },
  {
    key: "2",
    name: "Ultra-Widescreen",
    ratio: "21:9",
    dimensions: { width: 2560, height: 1080 },
  },
  {
    key: "3",
    name: "Classic Photography",
    ratio: "3:2",
    dimensions: { width: 1200, height: 800 },
  },
  {
    key: "4",
    name: "Widescreen Alternative",
    ratio: "16:10",
    dimensions: { width: 1280, height: 800 },
  },
  {
    key: "5",
    name: "Nearly Square",
    ratio: "5:4",
    dimensions: { width: 1280, height: 1024 },
  },
  {
    key: "6",
    name: "Portrait Photography",
    ratio: "2:3",
    dimensions: { width: 800, height: 1200 },
  },
  {
    key: "7",
    name: "CinemaScope",
    ratio: "2.39:1",
    dimensions: { width: 1920, height: 804 },
  },
];

export const socialMediaPostDimensions = [
  {
    key: "8",
    name: "Instagram Post",
    ratio: "1:1",
    dimensions: { width: 1080, height: 1080 },
  },
  {
    key: "9",
    name: "Instagram Story",
    ratio: "9:16",
    dimensions: { width: 1080, height: 1920 },
  },
  {
    key: "10",
    name: "Facebook Post",
    ratio: "1.91:1",
    dimensions: { width: 1200, height: 630 },
  },
  {
    key: "11",
    name: "Facebook Story",
    ratio: "9:16",
    dimensions: { width: 1080, height: 1920 },
  },
  {
    key: "12",
    name: "Twitter Post",
    ratio: "16:9",
    dimensions: { width: 1200, height: 675 },
  },
  {
    key: "13",
    name: "Twitter Header",
    ratio: "3:1",
    dimensions: { width: 1500, height: 500 },
  },
  {
    key: "14",
    name: "LinkedIn Post",
    ratio: "1.91:1",
    dimensions: { width: 1200, height: 627 },
  },
  {
    key: "15",
    name: "LinkedIn Cover Photo",
    ratio: "4:1",
    dimensions: { width: 1584, height: 396 },
  },
  {
    key: "16",
    name: "YouTube Thumbnail",
    ratio: "16:9",
    dimensions: { width: 1280, height: 720 },
  },
  {
    key: "17",
    name: "Pinterest Pin",
    ratio: "2:3",
    dimensions: { width: 1000, height: 1500 },
  },
  {
    key: "18",
    name: "Snapchat Story",
    ratio: "9:16",
    dimensions: { width: 1080, height: 1920 },
  },
  {
    key: "19",
    name: "TikTok Video",
    ratio: "9:16",
    dimensions: { width: 1080, height: 1920 },
  },
];
