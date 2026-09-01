"use client";

import { ProgrammeItem } from "@/helpers/useTheatreStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

interface DeleteProgrammeDialogProps {
  item: ProgrammeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: (item: ProgrammeItem) => void;
  isDeleting?: boolean;
}

export function DeleteProgrammeDialog({
  item,
  open,
  onOpenChange,
  onConfirmDelete,
  isDeleting = false,
}: DeleteProgrammeDialogProps) {
  const handleDelete = () => {
    if (!item || isDeleting) return;
    onConfirmDelete(item);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isDeleting) onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-100 border border-white/8 bg-[#07181d]/90 backdrop-blur-md text-white p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_30px_rgba(239,68,68,0.05)] overflow-hidden">

        {/* Subtle top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />

        <DialogHeader className="space-y-4 pt-2">
          {/* Refined Icon Container */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-b from-red-500/10 to-red-500/20 border border-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-xl font-semibold tracking-tight text-zinc-100">
              Delete programme?
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-400 leading-relaxed font-light">
              {item ? (
                <>
                  This will permanently remove{" "}
                  <span className="font-medium text-zinc-200">"{item.title}"</span>{" "}
                  from the list. This action cannot be undone.
                </>
              ) : (
                "This will permanently remove the selected programme from the list."
              )}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t border-white/6 bg-transparent">
          <Button
            variant="ghost"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-2 sm:order-1 bg-white/3 hover:bg-white/8 text-zinc-300 hover:text-white border border-white/5 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
            className="w-full sm:w-auto order-1 sm:order-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium shadow-[0_2px_10px_rgba(239,68,68,0.25)] hover:shadow-[0_2px_15px_rgba(239,68,68,0.35)] transition-all duration-200 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4 opacity-90" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}