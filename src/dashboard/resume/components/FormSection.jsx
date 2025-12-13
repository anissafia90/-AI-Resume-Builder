import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg">
        <div className="flex gap-3">
          <Link to={"/dashboard"}>
            <Button className="bg-slate-800/60 hover:bg-slate-700 border border-white/10 rounded-full">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-300">
            <span className="font-medium">الخطوة</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
              {activeFormIndex}
            </span>
            <span className="text-slate-400">من 5</span>
          </div>

          <div className="flex gap-2">
            {activeFormIndex > 1 && (
              <Button
                className="bg-slate-800/60 hover:bg-slate-700 border border-white/10 rounded-full"
                size="sm"
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="hidden sm:inline mr-2">السابق</span>
              </Button>
            )}
            <Button
              disabled={!enableNext}
              className="bg-primary hover:bg-primary/90 rounded-full"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            >
              <span className="hidden sm:inline ml-2">التالي</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="sm:hidden flex items-center justify-center gap-2 text-sm text-slate-300 p-3 rounded-xl bg-slate-900/30 border border-white/5">
        <span className="font-medium">الخطوة</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
          {activeFormIndex}
        </span>
        <span className="text-slate-400">من 5</span>
      </div>

      {/* Personal Detail  */}
      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 6 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}

      {/* Experience  */}

      {/* Educational Detail  */}

      {/* Skills  */}
    </div>
  );
}

export default FormSection;
