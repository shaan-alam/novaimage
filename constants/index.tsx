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
    key: "0",
    name: "Standard",
    ratio: "4:3",
  },
  {
    key: "1",
    name: "Widescreen",
    ratio: "16:9",
  },
  {
    key: "2",
    name: "Ultra-Widescreen",
    ratio: "21:9",
  },
  {
    key: "3",
    name: "Classic Photography",
    ratio: "3:2",
  },
  {
    key: "4",
    name: "Widescreen Alternative",
    ratio: "16:10",
  },
  {
    key: "5",
    name: "Nearly Square",
    ratio: "5:4",
  },
  {
    key: "6",
    name: "Portrait Photography",
    ratio: "2:3",
  },
  {
    key: "7",
    name: "CinemaScope",
    ratio: "2.39:1",
  },
];

export const socialMediaPostDimensions = [
  {
    key: "8",
    name: "Instagram Post",
    ratio: "1:1",
  },
  {
    key: "9",
    name: "Instagram Story",
    ratio: "9:16",
  },
  {
    key: "10",
    name: "Facebook Post",
    ratio: "1.91:1",
  },
  {
    key: "11",
    name: "Facebook Story",
    ratio: "9:16",
  },
  {
    key: "12",
    name: "Twitter Post",
    ratio: "16:9",
  },
  {
    key: "13",
    name: "Twitter Header",
    ratio: "3:1",
  },
  {
    key: "14",
    name: "LinkedIn Post",
    ratio: "1.91:1",
  },
  {
    key: "15",
    name: "LinkedIn Cover Photo",
    ratio: "4:1",
  },
  {
    key: "16",
    name: "YouTube Thumbnail",
    ratio: "16:9",
  },
  {
    key: "17",
    name: "Pinterest Pin",
    ratio: "2:3",
  },
  {
    key: "18",
    name: "Snapchat Story",
    ratio: "9:16",
  },
  {
    key: "19",
    name: "TikTok Video",
    ratio: "9:16",
  },
];
