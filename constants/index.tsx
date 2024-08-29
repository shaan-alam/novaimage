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
    icon: <IconLayoutDashboard color="gray" />,
  },
  {
    label: "Generative Fill",
    href: "/generative-fill",
    icon: <IconDropletHalf2 color="gray" />,
  },
  {
    label: "Recolor",
    href: "/recolor",
    icon: <IconColorFilter color="gray" />,
  },
  {
    label: "Background Removal",
    href: "/background-remove",
    icon: <IconBackground color="gray" />,
  },
];
