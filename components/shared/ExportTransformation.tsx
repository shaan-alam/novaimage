import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { downloadImage } from "@/lib/utils";
import { TransformationConfig } from "@/types";
import { IconChevronRight, IconDownload } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { getCldImageUrl } from "next-cloudinary";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ButtonRadioProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
}

const ButtonRadio: React.FC<ButtonRadioProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <button
    id={id}
    role="radio"
    aria-checked={checked}
    onClick={() => onChange(id)}
    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
      checked
        ? "bg-[#2f3f4d] text-primary-foreground"
        : "bg-[#182027] text-secondary-foreground hover:bg-[#182027]/80"
    }`}
  >
    {label}
  </button>
);

interface ImageFormat {
  id: string;
  label: string;
}

const ExportTransformation = ({
  publicId,
  config,
}: {
  publicId: string;
  config: TransformationConfig;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const imageFormats: ImageFormat[] = [
    { id: "png", label: "PNG" },
    { id: "jpg", label: "JPG" },
    { id: "webp", label: "WebP" },
    { id: "jpeg", label: "JPEG" },
  ];

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
  };

  const handleExport = async () => {
    if (selectedFormat && config) {
      setIsPending(true);

      const {
        aspectRatio,
        remove,
        height,
        width,
        fillBackground,
        recolor,
        replaceColor,
      } = config;

      const image = getCldImageUrl({
        fillBackground,
        src: publicId,
        format: selectedFormat,
        aspectRatio: aspectRatio,
        remove,
        recolor,
        replaceColor,
        width,
        height,
      });

      toast
        .promise(downloadImage(image), {
          loading: "Please hold on while we export your image",
          error:
            "Oh, looks like something went wrong while exporting your image!",
          success: "Successfully exported your image!",
        })
        .then(() => {
          setIsPending(false);
        });
    }
  };

  return (
    <div className="w-full my-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CollapsibleTrigger asChild>
          <button
            className="flex items-center justify-between space-x-2 text-sm text-secondary-foreground/80 w-full py-2"
            aria-expanded={isOpen}
          >
            <span>Export Options</span>
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IconChevronRight className="h-4 w-4" />
            </motion.span>
          </button>
        </CollapsibleTrigger>
        <AnimatePresence initial={false}>
          <motion.div
            key="content"
            initial="collapsed"
            animate={isOpen ? "expanded" : "collapsed"}
            exit="collapsed"
            variants={{
              expanded: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <CollapsibleContent forceMount className="space-y-4">
              <div
                role="radiogroup"
                aria-label="Select export format"
                className="grid grid-cols-2 gap-2 pt-2"
              >
                {imageFormats.map((format) => (
                  <ButtonRadio
                    key={format.id}
                    id={format.id}
                    label={format.label}
                    checked={selectedFormat === format.id}
                    onChange={handleFormatChange}
                  />
                ))}
              </div>
              <Button
                onClick={handleExport}
                className="w-full"
                disabled={!selectedFormat}
                isLoading={isPending}
                icon={<IconDownload className="mr-2 h-4 w-4" />}
              >
                Export
              </Button>
            </CollapsibleContent>
          </motion.div>
        </AnimatePresence>
      </Collapsible>
    </div>
  );
};

export default ExportTransformation;
