"use client";
import { Button } from "@/components/ui/button";
import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";
import { v4 } from "uuid";

type ExportGenerationProps = {
  url: string;
};

const ExportGeneration = ({ url }: ExportGenerationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const exportImage = async (imageUrl: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `${v4()}.png`

      anchor.click();

      URL.revokeObjectURL(blobUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div>
      <Button
        icon={<IconDownload className="mr-2 h-4 w-4" />}
        className="w-full mt-2"
        onClick={() => exportImage(url)}
        isLoading={isLoading}
      >
        Export
      </Button>
    </div>
  );
};

export default ExportGeneration;
