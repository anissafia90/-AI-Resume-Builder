import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../service/AIModal";

const promptText =
  "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3-4 lines in array format, With summery and experience_level Field in JSON Format";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  // Load existing summary from resumeInfo
  useEffect(() => {
    if (resumeInfo?.summery) {
      setSummery(resumeInfo.summery);
    }
  }, [resumeInfo]);

  // Update context when user edits
  useEffect(() => {
    if (summery !== undefined) {
      setResumeInfo((prev) => ({
        ...prev,
        summery: summery,
      }));
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = promptText.replace("{jobTitle}", resumeInfo?.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const json = JSON.parse(result.response.text());
      setAiGenerateSummeryList(json);
    } catch (error) {
      toast("AI generation failed");
      console.error(error);
    }

    setLoading(false);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      data: {
        summery: summery,
      },
    };

    try {
      const resp = await GlobalApi.UpdateResumeDetail(
        resumeInfo?.documentId,
        payload
      );
      toast("Summary saved successfully");
      enabledNext(true);
    } catch (error) {
      console.error(error);
      toast("Error saving summary");
    }

    setLoading(false);
  };

  return (
    <div dir="rtl">
      <div className="p-6 md:p-8 shadow-2xl rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur mt-10">
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-white">الملخص المهني</h2>
          <p className="text-slate-300 text-sm mt-1">
            أضف ملخصاً احترافياً يبرز خبراتك ومهاراتك
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSave}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <label className="block text-sm font-medium text-slate-200">
              أضف الملخص
            </label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 flex gap-2 rounded-full"
            >
              <Brain className="h-4 w-4" /> إنشاء بالذكاء الاصطناعي
            </Button>
          </div>

          <Textarea
            className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400 min-h-[150px]"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
            placeholder="اكتب ملخصاً مهنياً يوضح خبراتك وأهدافك الوظيفية..."
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 rounded-full px-8"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "حفظ"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList?.length > 0 && (
        <div className="my-6">
          <h2 className="font-bold text-xl text-white mb-4">
            الاقتراحات الذكية
          </h2>

          <div className="space-y-4">
            {aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                onClick={() => setSummery(item?.summary)}
                className="p-5 rounded-xl border border-white/10 bg-slate-900/50 shadow-lg cursor-pointer transition hover:-translate-y-0.5 hover:border-primary/50"
              >
                <h2 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="text-sm bg-primary/20 px-3 py-1 rounded-full">
                    المستوى: {item?.experience_level}
                  </span>
                </h2>
                <p className="text-slate-200 leading-relaxed">
                  {item?.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summery;
