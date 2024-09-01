import { aspectRatiosOptions } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertImageToBase64 = (image: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => reject("Cannot convert to Base 64");

    reader.readAsDataURL(image);
  });

export const getImageWidth = (aspectRatio: string) => {
  return aspectRatiosOptions.find((ar) => ar.ratio === aspectRatio)?.dimensions
    .width;
};
export const getImageHeight = (aspectRatio: string) => {
  return aspectRatiosOptions.find((ar) => ar.ratio === aspectRatio)?.dimensions
    .height;
};

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

export const getImageDimensions = (
  file: File
): Promise<{ height: number; width: number }> => {
  const img = document.createElement("img");

  const promise = new Promise<{ height: number; width: number }>((resolve, reject) => {
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      resolve({ height, width });
    };

    img.onerror = reject;
  });

  img.src = URL.createObjectURL(file);

  return promise;
};
