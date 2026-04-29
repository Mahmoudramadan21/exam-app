import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import { memo } from "react";
import { useDeleteAccount } from "../hooks/use-delete-account";

function DeleteAccountModal() {
  const { mutation } = useDeleteAccount();

  return (
    <Dialog>
      {/* ===== Dialog Trigger ===== */}
      <DialogTrigger asChild>
        <Button variant="destructive" ui="fullWidth" size="xl">
          Delete My Account
        </Button>
      </DialogTrigger>

      {/* ===== Dialog Content ===== */}
      <DialogContent>
        {/* ===== Dialog Header ===== */}
        <DialogHeader className="text-center items-center pt-6 px-4">
          <div className="p-4 rounded-full bg-red-100 flex items-center justify-center relative before:absolute before:w-27 before:h-27 before:bg-red-50 before:rounded-full before:-z-10">
            <TriangleAlert size={50} className="text-red-600" />
          </div>

          <DialogTitle className="mt-5 font-geist-mono font-medium text-base lg:text-lg text-red-600">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription className="font-geist-mono text-sm text-gray-500">
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* ===== Dialog Footer ===== */}
        <DialogFooter className="grid grid-cols-2 xl:px-14">
          <DialogClose>
            <Button
              variant="outline"
              theme="secondary"
              ui="fullWidth"
              size="xl"
              className="my-0"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            ui="fullWidth"
            className="bg-red-600 hover:bg-red-700 text-white my-0"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DeleteAccountModal);
