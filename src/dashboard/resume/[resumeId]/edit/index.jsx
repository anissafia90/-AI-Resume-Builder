import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";

function EditResume() {
  const { resumeId } = useParams(); // هذا = documentId
  const [resumeInfo, setResumeInfo] = useState(null);

  const GetResumeInfo = async () => {
    try {
      const resp = await GlobalApi.GetResumeById(resumeId);

      setResumeInfo(resp.data);
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
