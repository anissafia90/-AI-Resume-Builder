import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";

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

      const item = resp.data.data[0];

      const clean = {
        id: item.id,
        documentId: item.attributes.documentId,
        ...item.attributes,
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
        (resumeInfo?.FirstName || "") +
        " " +
        (resumeInfo?.LastName || "") +
        " resume",
      text: "Hello Everyone, This is my resume please open url to see it",
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
      alert("Link copied to clipboard");
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
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family
          </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <Button onClick={handleShare}>Share</Button>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
