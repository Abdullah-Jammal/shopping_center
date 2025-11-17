import { ErrorStateProps } from "@/types/ErrorStateProps";
import { Button } from "./ui/button";

export function ErrorState({ message = "حدث خطأ أثناء جلب البيانات", onRetry }: ErrorStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 py-10 text-center">
      <p className="text-red-400 font-medium">{message}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="px-4 py-2 rounded-md bg-orange-300 text-white cursor-pointer"
        >
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}
