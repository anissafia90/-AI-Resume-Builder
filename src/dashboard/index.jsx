import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { Sparkles } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
      }
    );
  };
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  return (
    <div dir="rtl" className="p-6 md:px-10 lg:px-16 xl:px-24">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/60 to-primary/10 p-6 md:p-8 text-white shadow-2xl shadow-primary/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              سيرتي الذاتية
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              أنشئ وعدّل سيرتك بالعربية وبذكاء—ببساطة ووضوح.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-900/60 px-4 py-2 ring-1 ring-white/10">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm text-slate-200">
              اقتراحات ذكية جاهزة للاستخدام
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <AddResume />
          {resumeList.length > 0
            ? resumeList.map((resume, index) => (
                <ResumeCardItem
                  resume={resume}
                  key={index}
                  refreshData={GetResumesList}
                />
              ))
            : [1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-[280px] rounded-xl bg-slate-800/50 animate-pulse ring-1 ring-white/10"
                />
              ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
            <p className="text-sm text-slate-300">
              نصيحة: ركّز على الإنجازات القابلة للقياس، وأضف كلمات مفتاحية
              مرتبطة بالوظيفة.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10">
            <p className="text-sm text-slate-300">
              تذكير: يمكنك تخصيص الألوان والخطوط من صفحة التحرير ثم التنزيل
              فوراً.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
