import { IconArrowsShuffle } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RandomPromptButtonProps = {
  generateRandomPrompt: () => void;
};
const RandomPromptButton = ({
  generateRandomPrompt,
}: RandomPromptButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="p-1 rounded-full block w-fit hover:bg-muted cursor-pointer"
            onClick={generateRandomPrompt}
          >
            <IconArrowsShuffle className="h-4 w-4" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm text-muted">Generate a random prompt</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RandomPromptButton;
