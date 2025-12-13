import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
function Experience() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setExperinceList(
      Array.isArray(resumeInfo?.Experience) ? resumeInfo.Experience : []
    );
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experinceList.slice();
    newEntries[index][name] = e.target.value;

    setExperinceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experinceList,
    });
  }, [experinceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experinceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(experinceList);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div dir="rtl">
      <div className="p-6 md:p-8 shadow-2xl rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur mt-10">
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-white">الخبرات المهنية</h2>
          <p className="text-slate-300 text-sm mt-1">
            أضف تفاصيل خبراتك العملية السابقة
          </p>
        </div>
        <div className="space-y-6">
          {experinceList.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-slate-900/50 p-5 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    المسمى الوظيفي
                  </label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    placeholder="مثال: مطور برمجيات"
                    className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    اسم الشركة
                  </label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                    placeholder="مثال: تونيبليس"
                    className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    المدينة
                  </label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                    placeholder="مثال: تونس"
                    className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    الدولة
                  </label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                    placeholder="مثال: تونس"
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
                    onChange={(event) => handleChange(index, event)}
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
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                    className="bg-slate-800/60 border-white/10 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    وصف العمل والإنجازات
                  </label>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
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
              onClick={AddNewExperience}
              className="flex-1 sm:flex-none text-primary border-primary/30 hover:bg-primary/10 rounded-full"
            >
              + إضافة خبرة أخرى
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
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
    </div>
  );
}

export default Experience;
