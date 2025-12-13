import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_KEY;

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || "",
        lastName: resumeInfo.lastName || "",
        jobTitle: resumeInfo.jobTitle || "",
        address: resumeInfo.address || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
      });
    }
  }, [resumeInfo]);
  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // تحديث الـ Preview
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("resumeInfo:", resumeInfo);
    if (!resumeInfo?.documentId) {
      toast("Resume documentId not found");
      setLoading(false);
      return;
    }

    const payload = {
      data: {
        Title: resumeInfo.Title,
        ResumeId: resumeInfo.ResumeId,
        UserEmail: resumeInfo.UserEmail,
        UserName: resumeInfo.UserName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        jobTitle: formData.jobTitle,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      },
    };

    try {
      const response = await fetch(
        `https://artistic-smile-d0e6ac543f.strapiapp.com/api/user-resumes/${resumeInfo.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        toast("Update failed");
        setLoading(false);
        return;
      }

      setResumeInfo(data.data);
      toast("Details updated successfully");
      enabledNext(true);
    } catch (error) {
      console.error(error);
      toast("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="p-6 md:p-8 shadow-2xl rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur mt-10"
    >
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-white">المعلومات الشخصية</h2>
        <p className="text-slate-300 text-sm mt-1">
          ابدأ بإدخال معلوماتك الأساسية
        </p>
      </div>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              الاسم الأول
            </label>
            <Input
              name="firstName"
              defaultValue={formData.firstName || ""}
              required
              onChange={handleInputChange}
              placeholder="مثال: أحمد"
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              الاسم الأخير
            </label>
            <Input
              name="lastName"
              defaultValue={formData.lastName || ""}
              required
              onChange={handleInputChange}
              placeholder="مثال: بن علي"
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              المسمى الوظيفي
            </label>
            <Input
              name="jobTitle"
              defaultValue={formData.jobTitle || ""}
              required
              onChange={handleInputChange}
              placeholder="مثال: مطور واجهات أمامية"
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              العنوان
            </label>
            <Input
              name="address"
              defaultValue={formData.address || ""}
              required
              onChange={handleInputChange}
              placeholder="مثال: تونس، العاصمة"
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              رقم الهاتف
            </label>
            <Input
              name="phone"
              defaultValue={formData.phone || ""}
              required
              onChange={handleInputChange}
              placeholder="مثال: +216 12 345 678"
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              البريد الإلكتروني
            </label>
            <Input
              name="email"
              defaultValue={formData.email || ""}
              required
              onChange={handleInputChange}
              placeholder="مثال: ahmed@example.com"
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
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
  );
}

export default PersonalDetail;
