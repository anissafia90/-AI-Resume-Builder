import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import GlobalApi from "../../service/GlobalApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(resume.Title);
  // const onMenuClick=(url)=>{
  //   navigation(url)
  // }

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const onUpdate = () => {
    setLoading(true);
    const data = {
      data: {
        Title: updatedTitle,
      },
    };
    GlobalApi.UpdateResumeDetail(resume.documentId, data).then(
      (resp) => {
        console.log(resp);
        toast("Resume Title Updated!");
        refreshData();
        setLoading(false);
        setOpenUpdateDialog(false);
      },
      (error) => {
        setLoading(false);
        toast("Failed to update resume");
      }
    );
  };
  return (
    <div dir="rtl" className="">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14 bg-gradient-to-b from-white/10 via-slate-100 to-slate-200 h-[280px] rounded-t-lg border-t-4"
          style={{
            borderColor: resume?.themeColor,
          }}
        >
          <div
            className="flex 
        items-center justify-center h-[180px] "
          >
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between items-center text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm text-black font-semibold">{resume.Title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              تعديل
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              عرض
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              تنزيل
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenUpdateDialog(true)}>
              إعادة تسمية
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف السيرة نهائياً.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "حذف"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={openUpdateDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تحديث عنوان السيرة</AlertDialogTitle>
              <AlertDialogDescription>
                أدخل عنواناً جديداً لسيرتك الذاتية.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Input
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="عنوان السيرة"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenUpdateDialog(false)}>
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction onClick={onUpdate} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "تحديث"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
