import Image from "next/image";
import MyTransformations from "@/components/Dashboard/MyTransformations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import MyImageGenerations from "@/components/Dashboard/MyImageGenerations";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const aiTools = [
    {
      title: "AI Generative Image",
      description:
        "Automatically fill in missing parts of your images with realistic and creative results.",
      image: "/images/generative-fill-demo.png",
      link: "/generative-fill",
    },
    {
      title: "AI Generative Recolor",
      description:
        "Recolor your images with a single click. Change colors to match your brand or create new moods.",
      image: "/images/generative-recolor-demo.png",
      link: "/generative-recolor",
    },
    {
      title: "AI Object Removal",
      description:
        "Remove unwanted objects from your photos seamlessly. No more photobombs or distracting elements!",
      image: "/images/object-removal-demo.png",
      link: "/object-removal",
    },
    {
      title: "AI Image Generation",
      description:
        "Generate stunning images with our AI-powered generative image generator.",
      image: "/images/image-gen-demo.png",
      link: "/image-gen",
    },
  ];

  return (
    <section className="w-full h-screen py-24 sm:py-12 px-4 sm:px-0 bg-gradient-to-b from-background to-secondary/20">
      <ScrollArea className="h-screen">
        <Tabs defaultValue="ai-tools" className="w-full max-w-5xl mx-auto">
          <TabsList className="mb-8 justify-center">
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="my-transformations">
              Your Transformations
            </TabsTrigger>
            <TabsTrigger value="my-image-generations">
              Your Image Generations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ai-tools">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {aiTools.map((tool, index) => (
                <Card
                  key={index}
                  className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2">
                        {tool.title}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-0 pt-4">
                      <Link href={tool.link} className="w-full">
                        <Button className="w-full">Use Tool</Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-8 text-center">
              More AI tools coming soon!
            </p>
          </TabsContent>
          <TabsContent value="my-transformations">
            <MyTransformations />
          </TabsContent>
          <TabsContent value="my-image-generations">
            <MyImageGenerations />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </section>
  );
}
