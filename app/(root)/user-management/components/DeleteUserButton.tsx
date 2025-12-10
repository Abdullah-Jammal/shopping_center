"use client";

import { Button } from "@/components/ui/button";
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

import { useDeleteUser } from "../hooks/useDeleteUser";
import { Trash2 } from "lucide-react";

export function DeleteUserButton({ userId }: { userId: string }) {
  const mutation = useDeleteUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-600 hover:bg-red-200 bg-red-100 hover:text-red-700 rounded-md w-10 cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">هل أنت متأكد؟</AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            سيتم حذف هذا المستخدم بشكل نهائي ولا يمكن التراجع عن العملية.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-2" dir="ltr">
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-600 w-32"
            onClick={() => mutation.mutate(userId)}
            >
            حذف
          </AlertDialogAction>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
