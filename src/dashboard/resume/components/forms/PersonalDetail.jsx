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

  // عند تحميل الصفحة نعمل مزج مع formData
  useEffect(() => {
    if (resumeInfo?.data) {
      setFormData({
        firstName: resumeInfo.data.firstName || "",
        lastName: resumeInfo.data.lastName || "",
        jobTitle: resumeInfo.data.jobTitle || "",
        address: resumeInfo.data.address || "",
        phone: resumeInfo.data.phone || "",
        email: resumeInfo.data.email || "",
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);

    // تحديث الـ Context للـ Preview
    setResumeInfo({
      ...resumeInfo,
      data: {
        ...resumeInfo.data,
        [name]: value,
      },
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const realId = resumeInfo?.data?.id;
    if (!realId) {
      toast("Resume ID not found");
      setLoading(false);
      return;
    }

    // دمج formData + resumeInfo.data
    const mergedData = {
      ...resumeInfo.data,
      ...formData,
    };

    // حذف الـ keys الممنوعة
    const forbiddenKeys = [
      "id",
      "documentId",
      "createdAt",
      "updatedAt",
      "publishedAt",
      "locale",
      "localizations",
    ];
    forbiddenKeys.forEach((key) => delete mergedData[key]);

    const payload = { data: mergedData };
    console.log("FINAL PAYLOAD TO STRAPI:", payload);

    try {
      const resp = await GlobalApi.UpdateResumeDetail(realId, payload);

      // تحديث الكونتكست بعد ال-update
      setResumeInfo({ data: resp.data.data });

      toast("Details updated successfully");
      enabledNext(true);
    } catch (err) {
      console.error(err.response?.data || err);
      toast("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData.address || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData.phone || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData.email || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
