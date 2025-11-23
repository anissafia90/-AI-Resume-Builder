import React, { useContext, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "../../../service/GlobalApi";

function ThemeColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(
    () => resumeInfo?.themeColor
  );

  useEffect(() => {
    // keep local selectedColor in sync if resumeInfo changes
    if (resumeInfo && resumeInfo.themeColor) {
      setSelectedColor(resumeInfo.themeColor);
    }
  }, [resumeInfo]);
  const { resumeId } = useParams();
  const onColorSelect = (color) => {
    setSelectedColor(color);
    // use functional update to avoid errors if resumeInfo is undefined
    setResumeInfo((prev) => ({ ...(prev || {}), themeColor: color }));

    const data = {
      data: {
        themeColor: color,
      },
    };

    if (resumeId) {
      GlobalApi.UpdateResumeDetail(resumeId, data)
        .then((resp) => {
          console.log(resp);
          toast.success?.("Theme Color Updated") ||
            toast("Theme Color Updated");
        })
        .catch((err) => {
          console.error(err);
          toast.error?.("Failed to update theme color") ||
            toast("Failed to update theme color");
        });
    } else {
      // fallback: update locally when no resumeId available
      toast("Theme Color updated locally");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-3 items-center px-3 py-2 rounded"
        >
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                selectedColor === item ? "border border-black" : ""
              }`}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
