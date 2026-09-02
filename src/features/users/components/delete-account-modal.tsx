import { memo } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import { TriangleAlert } from "lucide-react";
import { useDeleteAccount } from "@/features/users/hooks";

function DeleteAccountModal() {
  const { mutation } = useDeleteAccount();

  return (
    <Dialog>
      {/* ===== Dialog Trigger ===== */}
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-50 hover:bg-red-100 text-red-600"
          size="xl"
        >
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
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
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
