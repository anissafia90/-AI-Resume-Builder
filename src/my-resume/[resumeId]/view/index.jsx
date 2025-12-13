import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { Download, Share2, CheckCircle2, Sparkles, Eye } from "lucide-react";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      const resp = await GlobalApi.GetResumeByDocumentId(resumeId);

      console.log("RAW VIEW RESPONSE:", resp.data);

      if (!resp.data.data || resp.data.data.length === 0) {
        console.error("No resume found!");
        return;
      }

      const item = resp.data.data[0]; // بدون attributes

      const clean = {
        ...item,
      };

      console.log("CLEAN VIEW:", clean);
      setResumeInfo(clean);
    } catch (err) {
      console.error("ERROR VIEW RESUME:", err);
    }
  };

  const HandleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title:
        (resumeInfo?.firstName || "") +
        " " +
        (resumeInfo?.lastName || "") +
        " سيرة ذاتية",
      text: "مرحباً بالجميع، هذه سيرتي الذاتية، يرجى فتح الرابط لعرضها",
      url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("share failed", err);
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      alert("تم نسخ الرابط إلى الحافظة");
    } catch (err) {
      window.open(
        `mailto:?subject=${encodeURIComponent(
          shareData.title
        )}&body=${encodeURIComponent(shareData.url)}`
      );
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print" dir="rtl">
        <Header />

        <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 md:py-12 lg:py-16">
          <div
            className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="absolute -right-40 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                تم الإنجاز بنجاح
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                تهانينا! سيرتك الذاتية جاهزة
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                سيرتك الذاتية التي أنشأتها بالذكاء الاصطناعي جاهزة الآن للتحميل
                والمشاركة مع أصدقائك وعائلتك والشركات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={HandleDownload}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-0.5 hover:-translate-y-0.5 transition-all"
              >
                <div className="relative rounded-xl bg-slate-950 px-6 py-4 transition-all group-hover:bg-transparent">
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Download className="h-5 w-5" />
                    <span className="text-lg font-semibold">تحميل السيرة</span>
                  </div>
                </div>
              </button>

              <button
                onClick={handleShare}
                className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/5 p-0.5 hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-0.5 transition-all"
              >
                <div className="relative rounded-xl px-6 py-4">
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Share2 className="h-5 w-5" />
                    <span className="text-lg font-semibold">مشاركة الرابط</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: CheckCircle2,
                  title: "سيرة احترافية",
                  desc: "تصميم عصري وجذاب",
                },
                { icon: Eye, title: "معاينة فورية", desc: "طباعة أو حفظ PDF" },
                {
                  icon: Share2,
                  title: "مشاركة سهلة",
                  desc: "شارك مع أي شخص برابط",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-center mb-2">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                نصائح مهمة:
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>حمّل السيرة بصيغة PDF للحفاظ على التنسيق بدقة</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>شارك رابط السيرة مع جهات التوظيف والشركات</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>يمكنك العودة للتحرير في أي وقت لتحديث بياناتك</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 md:my-12 lg:my-16 mx-4 md:mx-10 lg:mx-16 xl:mx-32">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
