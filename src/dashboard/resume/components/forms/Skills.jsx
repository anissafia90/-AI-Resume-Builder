import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const { resumeId } = useParams();

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (Array.isArray(resumeInfo?.Skills)) {
      setSkillsList(resumeInfo.Skills);
    } else {
      setSkillsList([]);
    }
  }, [resumeInfo]);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();

    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div
      dir="rtl"
      className="p-6 md:p-8 shadow-2xl rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur mt-10"
    >
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-white">المهارات</h2>
        <p className="text-slate-300 text-sm mt-1">
          أضف أهم مهاراتك المهنية والتقنية
        </p>
      </div>

      <div className="space-y-4">
        {(skillsList || []).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-4 shadow-lg"
          >
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-200 mb-2">
                اسم المهارة
              </label>
              <Input
                className="w-full bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="مثال: React.js"
              />
            </div>
            <div className="flex flex-col items-start md:items-center gap-2">
              <label className="text-sm font-medium text-slate-200">
                مستوى الإتقان
              </label>
              <Rating
                style={{ maxWidth: 140 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="flex-1 sm:flex-none text-primary border-primary/30 hover:bg-primary/10 rounded-full"
          >
            + إضافة مهارة
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="flex-1 sm:flex-none text-red-400 border-red-400/30 hover:bg-red-400/10 rounded-full"
          >
            - إزالة
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={() => onSave()}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 rounded-full"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "حفظ"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
