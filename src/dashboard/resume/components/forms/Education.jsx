import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (resumeInfo?.Education) {
      setEducationalList(
        Array.isArray(resumeInfo.Education) ? resumeInfo.Education : []
      );
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Education: educationalList,
    });
  }, [educationalList]);
  return (
    <div
      dir="rtl"
      className="p-6 md:p-8 shadow-2xl rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur mt-10"
    >
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-white">التعليم</h2>
        <p className="text-slate-300 text-sm mt-1">
          أضف تفاصيل مؤهلاتك الأكاديمية
        </p>
      </div>

      <div className="space-y-6">
        {(resumeInfo?.Education || []).map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-slate-900/50 p-5 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  اسم الجامعة أو المؤسسة
                </label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                  placeholder="مثال: جامعة تونس المنار"
                  className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  الدرجة العلمية
                </label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                  placeholder="مثال: بكالوريوس"
                  className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  التخصص
                </label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                  placeholder="مثال: علوم الحاسوب"
                  className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  تاريخ البداية
                </label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                  className="bg-slate-800/60 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  تاريخ النهاية
                </label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                  className="bg-slate-800/60 border-white/10 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  وصف إضافي
                </label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                  placeholder="اكتب ملخصاً عن إنجازاتك أو أنشطتك الأكاديمية..."
                  className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="flex-1 sm:flex-none text-primary border-primary/30 hover:bg-primary/10 rounded-full"
          >
            + إضافة تعليم آخر
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
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

export default Education;
