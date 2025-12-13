import Header from "@/components/custom/Header";
import { AtomIcon, CheckCircle2, Edit, Share2, Sparkles } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 via-slate-900 to-slate-950"
          aria-hidden
        />
        <div
          className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
          aria-hidden
        />

        <section className="relative z-10 px-6 pb-20 pt-10 lg:px-12 lg:pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 shadow-lg shadow-primary/10 ring-1 ring-white/10">
                <AtomIcon className="h-5 w-5 text-primary" />
                <span className="text-sm text-slate-200">
                  مدعوم بالذكاء الاصطناعي
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                  ابنِ سيرتك الذاتية الاحترافية في دقائق
                  <span className="text-primary"> بذكاء</span>
                </h1>
                <p className="max-w-2xl text-lg text-slate-300">
                  محرر ذكي يكتب بالعربية، ينسق تلقائياً، ويقترح محتوى قوي يناسب
                  الوظيفة التي تحلم بها. واجهة بسيطة يفهمها الجميع.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/dashboard"
                  className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  ابدأ الآن مجاناً
                </a>
                <a
                  href="#how"
                  className="rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  كيف يعمل؟
                </a>
              </div>

              <div className="grid w-full max-w-xl grid-cols-2 gap-4 md:grid-cols-3">
                {["100+ سيرة جاهزة", "90٪ راضون", "(3 دقائق للإطلاق)"].map(
                  (item, idx) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white/5 p-4 text-center shadow-lg shadow-slate-900/40 ring-1 ring-white/5"
                    >
                      <p className="text-lg font-semibold text-white">{item}</p>
                      <p className="text-xs text-slate-300">
                        مؤشرات ثقة من المستخدمين
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/30 via-cyan-400/20 to-transparent blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-primary/10 backdrop-blur">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                  <span className="text-sm text-slate-200">معاينة فورية</span>
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-6 space-y-4 rounded-2xl bg-slate-900/60 p-4">
                  {["المعلومات الشخصية", "الخبرات", "التعليم", "المهارات"].map(
                    (section) => (
                      <div
                        key={section}
                        className="flex items-center justify-between rounded-xl bg-slate-800/70 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <p className="text-slate-100">{section}</p>
                        </div>
                        <span className="text-xs text-slate-400">جاهز</span>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary/20 to-cyan-400/10 p-4 text-sm text-slate-200">
                  أضف بياناتك، اكتب هدفك المهني، ودع الذكاء الاصطناعي يقترح لك
                  صياغات مقنعة تلقائياً.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="relative z-10 px-6 pb-20 lg:px-12">
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="space-y-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                كيف يعمل
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">
                3 خطوات سهلة ومباشرة
              </h2>
              <p className="text-slate-300">
                من التسجيل حتى التنزيل دون تعقيد، كل شيء واضح باللغة العربية.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Edit,
                  title: "اكتب أو ألصق بياناتك",
                  desc: "املأ الحقول الأساسية أو انسخ بياناتك الحالية، والمحرر سيعيد ترتيبها تلقائياً.",
                  badge: "الخطوة 1",
                },
                {
                  icon: AtomIcon,
                  title: "فعّل الاقتراحات الذكية",
                  desc: "يحسن العبارات، يضيف كلمات مفتاحية، ويقترح صياغات تناسب الوظيفة.",
                  badge: "الخطوة 2",
                },
                {
                  icon: Share2,
                  title: "نزّل وشارك فوراً",
                  desc: "احفظ بصيغ متعددة أو شارك رابطاً جاهزاً، مع تصميم متجاوب على كل الأجهزة.",
                  badge: "الخطوة 3",
                },
              ].map(({ icon: Icon, title, desc, badge }) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/40"
                >
                  <div className="absolute right-4 top-4 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    {badge}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-20 lg:px-12">
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/60 to-primary/10 p-10 shadow-2xl shadow-primary/10">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  لماذا نحن
                </p>
                <h2 className="text-3xl font-bold md:text-4xl">
                  واجهة عربية بسيطة ونتائج مذهلة
                </h2>
                <p className="text-slate-200">
                  تم تصميم المنصة لتكون مفهومة للجميع: واجهة واضحة، نصائح فورية،
                  وأقسام منظمة جاهزة للطباعة أو المشاركة رقمياً.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "قوالب عربية جاهزة ومتجاوبة",
                  "تخصيص ألوان وخطوط بنقرة",
                  "حفظ سحابي وتحديث فوري",
                  "دعم كلمات مفتاحية ATS",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/5"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                    <p className="text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-20 lg:px-12">
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary/30 bg-primary/10 p-10 text-center shadow-2xl shadow-primary/30">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              جاهز لتبدأ؟
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              أطلق سيرتك الآن وشاركها بثقة
            </h2>
            <p className="mt-4 text-slate-200">
              ابدأ مجاناً، جرّب القوالب، وعدّل كما تشاء. عند الانتهاء يمكنك
              التنزيل أو المشاركة بضغطة واحدة.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="/dashboard"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/30"
              >
                إنشاء السيرة الآن
              </a>
              <a
                href="#how"
                className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
              >
                استكشف المزايا
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
