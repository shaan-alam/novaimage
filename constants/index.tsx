import { zodTransformationTypeSchema } from "@/types";
import {
  IconBackground,
  IconColorFilter,
  IconLayoutDashboard,
  IconSparkles,
} from "@tabler/icons-react";
import Image from "next/image";
import { z } from "zod";

export const transformationConfigSchema = z.object({
  title: z.string(),
  fillBackground: z.boolean().optional(),
  remove: z.string().optional(),
  transformationType: zodTransformationTypeSchema,
  recolor: z
    .object({
      prompt: z.string(),
      multiple: z.boolean(),
      to: z.string(),
    })
    .optional(),
  aspectRatio: z
    .string()
    .min(1, { message: "Aspect Ratio is required" })
    .optional(),
  aspect_ratio_key: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

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
    label: "Generative Recolor",
    href: "/generative-recolor",
    icon: IconColorFilter,
  },
  {
    label: "Object Removal",
    href: "/object-removal",
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

type Feature = {
  title: string;
  description: string;
  content?: React.ReactNode | any;
};

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nova Image has completely transformed the way I edit and enhance my photos. The AI tools are both powerful and easy to use!",
    name: "Emily Jones",
    title: "Professional Photographer",
  },
  {
    quote:
      "With Nova Image, I can create flawless visuals for my online store in just minutes. It's a game-changer for my business!",
    name: "Mark Stevens",
    title: "E-commerce Entrepreneur",
  },
  {
    quote:
      "I love how effortless image editing has become with Nova Image. The background removal tool is especially incredible!",
    name: "Sophia Martinez",
    title: "Graphic Designer",
  },
  {
    quote:
      "The AI features in Nova Image are top-notch. It's like having a personal designer working on every photo!",
    name: "James Reed",
    title: "Content Creator",
  },
  {
    quote:
      "Nova Image's object removal feature is unbelievable. I can clean up any photo and make it look perfect!",
    name: "Alicia Green",
    title: "Social Media Influencer",
  },
  {
    quote:
      "I've been able to speed up my workflow thanks to Nova Image. The tools are fast, intuitive, and produce high-quality results!",
    name: "Michael Nguyen",
    title: "Digital Artist",
  },
  {
    quote:
      "As a web designer, Nova Image has helped me generate creative assets that stand out. It's become an essential tool for my projects.",
    name: "Olivia Carter",
    title: "Web Designer",
  },
  {
    quote:
      "Nova Image has changed the way I think about photo editing. The AI-powered recolor tool is my favorite!",
    name: "David Patel",
    title: "Marketing Manager",
  },
  {
    quote:
      "The ease of use and efficiency of Nova Image make it a must-have for anyone working with visuals. It saves me so much time!",
    name: "Rachel Simmons",
    title: "Freelance Designer",
  },
  {
    quote:
      "From background removal to object generation, Nova Image has everything I need to make my images look professional in minutes.",
    name: "Liam Turner",
    title: "Creative Director",
  },
];

export const features: Feature[] = [
  {
    title: "AI Generative Fill",
    description:
      "Automatically fill in missing parts of your images with realistic and creative results. Say goodbye to incomplete photos!",
    content: (
      <Image
        src="/images/generative-fill-demo.png"
        width={1920}
        height={640}
        alt="Demo"
        className="shadow-background shadow-2xl rounded-2xl"
      />
    ),
  },
  {
    title: "AI Recolor",
    description:
      "Recolor your images with a single click. Change colors to match your brand or create entirely new moods.",
    content: (
      <Image
        src="/images/generative-recolor-demo.png"
        width={1920}
        height={640}
        alt="Demo"
        className="shadow-background shadow-2xl rounded-2xl"
      />
    ),
  },
  {
    title: "AI Object Removal",
    description:
      "Remove unwanted objects from your photos seamlessly. No more photobombs or distracting elements!",
    content: (
      <Image
        src="/images/object-removal-demo.png"
        width={1920}
        height={640}
        alt="Demo"
        className="shadow-background shadow-2xl rounded-2xl"
      />
    ),
  },
  {
    title: "AI Image Generation",
    description:
      "Generate stunning images from scratch with the power of AI. Perfect for when you need a unique visual in seconds.",
    content: (
      <Image
        src="/images/image-gen-demo.png"
        width={1920}
        height={640}
        alt="Demo"
        className="shadow-background shadow-2xl rounded-2xl"
      />
    ),
  },
  {
    title: "AI Background Removal (Coming Soon)",
    description:
      "Instantly remove backgrounds to isolate your subject. Ideal for creating professional product images or unique portraits.",
    content: (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold">Coming Soon!</h1>
      </div>
    ),
  },
  {
    title: "",
    description: "",
  },
];
