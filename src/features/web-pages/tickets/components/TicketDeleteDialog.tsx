"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { UserTicket } from "../types";
import { deleteTicket } from "@/helpers/next-fetch/ticketActions";

interface TicketDeleteDialogProps {
  ticket: UserTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TicketDeleteDialog({
  ticket,
  isOpen,
  onClose,
  onSuccess,
}: TicketDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!ticket) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteTicket(ticket._id);
      if (res?.success) {
        toast.success(res.message || "Ticket deleted successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(
          (typeof res?.error === "string" ? res.error : res?.message) ||
            "Failed to delete ticket.",
        );
      }
    } catch {
      toast.error("Failed to delete ticket. Please check your connection.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isDeleting && !open && onClose()}>
      <DialogContent className="w-[96vw] max-w-[96vw] sm:max-w-md rounded-[28px] md:rounded-[32px] p-6 md:p-8 border-gray-100 shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div>
            <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
              Delete This Ticket?
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm text-gray-500 font-medium mt-1.5 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-gray-900 font-bold">"{ticket.name}"</strong>?
              This ticket file and its saved details will be permanently removed.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
            className="h-11 rounded-2xl text-xs font-black uppercase tracking-wider text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-11 px-6 rounded-2xl text-xs font-black uppercase tracking-widest bg-rose-600 hover:bg-rose-700 text-white gap-2 shadow-lg shadow-rose-600/20"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Delete Ticket</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
