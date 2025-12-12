import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";

function EditResume() {
  const { resumeId } = useParams(); // هذا = documentId
  const defaultResume = {
    Title: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Summary: "",
    Experience: [],
    Education: [],
    Skills: [],
  };
  const [resumeInfo, setResumeInfo] = useState(defaultResume);
  const GetResumeInfo = async () => {
    try {
      const resp = await GlobalApi.GetResumeById(resumeId);
      const attributes = resp?.data?.data?.attributes || {};
      const clean = {
        id: resp?.data?.data?.id || null,
        documentId: resp?.data?.data?.documentId || null,
        Title: attributes.Title || "",
        firstName: attributes.firstName || "",
        lastName: attributes.lastName || "",
        email: attributes.email || "",
        phone: attributes.phone || "",
        jobTitle: attributes.jobTitle || "",
        Summary: attributes.Summary || "",
        Experience: Array.isArray(attributes.Experience)
          ? attributes.Experience
          : [],
        Education: Array.isArray(attributes.Education)
          ? attributes.Education
          : [],
        Skills: Array.isArray(attributes.Skills) ? attributes.Skills : [],
      };
      console.log("CLEAN:", clean);
      setResumeInfo(clean);
      console.log("FULL RESUME OBJECT ✅", resp.data);
    } catch (error) {
      console.error("ERROR FETCHING RESUME ❌", error);
    }
  };

  useEffect(() => {
    GetResumeInfo();
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
