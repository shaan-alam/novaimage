import { Cloudinary } from "@cloudinary/url-gen";
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

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#182027" offset="20%" />
      <stop stop-color="#26333D" offset="50%" />
      <stop stop-color="#182027" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#182027" />
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

  const promise = new Promise<{ height: number; width: number }>(
    (resolve, reject) => {
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        resolve({ height, width });
      };

      img.onerror = reject;
    }
  );

  img.src = URL.createObjectURL(file);

  return promise;
};

export async function convertImageURLToBase64(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = await Buffer.from(buffer).toString("base64");
  return `data:image/webp;base64,${data}`;
}

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});

export const downloadImage = async (imageSrc: string) => {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "image file name here";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
