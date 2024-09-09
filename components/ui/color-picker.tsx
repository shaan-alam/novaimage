import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { HexColorPicker } from "react-colorful";
import { Button } from "./button";

type ColorPickerProps = {
  color: string;
  onChange: (newColor: string) => void;
  className?: string;
};

const ColorPicker = ({ color, onChange, className }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          style={{ background: `${color}` }}
          variant="secondary"
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !color && "text-muted-foreground",
            className
          )}
        >
          {color ? color : <span>Pick a color</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
