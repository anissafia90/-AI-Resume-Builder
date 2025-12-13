import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const onCreate = async () => {
    if (!user || loading) return;

    if (!resumeTitle?.trim()) {
      alert("Resume title is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        Title: resumeTitle,
        ResumeId: uuidv4(),
        UserEmail: user.primaryEmailAddress?.emailAddress,
        UserName: user.fullName,
      };

      const resp = await GlobalApi.CreateNewResume(payload);

      console.log("CREATE RESPONSE:", resp.data);

      const documentId = resp.data?.data?.documentId;

      if (!documentId) {
        throw new Error("documentId not returned from Strapi");
      }

      navigation(`/dashboard/resume/${documentId}/edit`);
    } catch (error) {
      console.error("CREATE RESUME ERROR:", error);
      alert("Failed to create resume");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div dir="rtl" className="text-white">
      <div
        className="group p-8 md:p-10 border items-center flex flex-col gap-3 justify-center bg-slate-900/50 rounded-xl h-[280px] hover:-translate-y-0.5 transition-all hover:shadow-lg cursor-pointer border-dashed ring-1 ring-white/10"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <PlusSquare className="h-6 w-6" />
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-300">إنشاء سيرة جديدة</p>
          <p className="text-xs text-slate-400">ابدأ سيرتك خلال دقائق</p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg sm:max-w-[425px] -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-950/90 backdrop-blur rounded-xl shadow-2xl border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              إنشاء سيرة جديدة
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              <p>أدخل عنواناً واضحاً لسيرتك الجديدة</p>
              <Input
                className="my-3"
                placeholder="مثال: مطوّر واجهات أمامية"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setOpenDialog(false)}
                variant="ghost"
                className="rounded-full"
              >
                إلغاء
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                {loading ? <Loader2 className="animate-spin" /> : "إنشاء"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
