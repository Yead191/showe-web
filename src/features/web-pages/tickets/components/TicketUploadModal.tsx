"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  FileText,
  Calendar,
  Tag as TagIcon,
  Ticket as TicketIcon,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
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
import { isPdfFile, formatFileSize } from "../utils";
import { createTicket, updateTicket } from "@/helpers/next-fetch/ticketActions";
import { getImageUrl } from "@/lib/getImageUrl";

interface TicketUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketToEdit?: UserTicket | null;
  onSuccess: () => void;
}

const SUGGESTED_TAGS = ["Concert", "Theatre", "Festival", "VIP", "Sports", "Live"];

export default function TicketUploadModal({
  isOpen,
  onClose,
  ticketToEdit,
  onSuccess,
}: TicketUploadModalProps) {
  const isEditing = Boolean(ticketToEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate or reset form whenever modal opens or edit ticket changes
  useEffect(() => {
    if (isOpen) {
      if (ticketToEdit) {
        setName(ticketToEdit.name || "");
        // Extract YYYY-MM-DD from date string
        let formattedDate = "";
        if (ticketToEdit.date) {
          try {
            formattedDate = ticketToEdit.date.split("T")[0];
          } catch {
            formattedDate = ticketToEdit.date;
          }
        }
        setDate(formattedDate);
        setTags(Array.isArray(ticketToEdit.tags) ? [...ticketToEdit.tags] : []);
        setSelectedFile(null);
        setFilePreviewUrl(ticketToEdit.file ? getImageUrl(ticketToEdit.file) : null);
      } else {
        setName("");
        // Default date to today
        setDate(new Date().toISOString().split("T")[0]);
        setTags([]);
        setSelectedFile(null);
        setFilePreviewUrl(null);
      }
      setCurrentTagInput("");
    }
  }, [isOpen, ticketToEdit]);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (filePreviewUrl && filePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  // File selection handler
  const handleFileSelect = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isImage && !isPdf) {
      toast.error("Please upload a valid PDF document or Image (JPG, PNG, WebP).");
      return;
    }

    // Limit to 25MB
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 25MB.");
      return;
    }

    setSelectedFile(file);
    if (isImage) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Tags management
  const handleAddTag = (tagToAdd?: string) => {
    const val = (tagToAdd || currentTagInput).trim().replace(/^#/, "");
    if (!val) return;
    if (tags.some((t) => t.toLowerCase() === val.toLowerCase())) {
      setCurrentTagInput("");
      return;
    }
    setTags([...tags, val]);
    setCurrentTagInput("");
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please provide a name for this ticket.");
      return;
    }

    if (!date) {
      toast.error("Please select an event date.");
      return;
    }

    if (!isEditing && !selectedFile) {
      toast.error("Please upload your ticket file (PDF or Image).");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("date", date);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      if (tags.length > 0) {
        tags.forEach((tag) => {
          formData.append("tags[]", tag.trim());
        });
      }

      formData.append("tags_image", "");

      let res;
      if (isEditing && ticketToEdit?._id) {
        res = await updateTicket(ticketToEdit._id, formData);
      } else {
        res = await createTicket(formData);
      }

      if (res?.success) {
        toast.success(
          res.message ||
            (isEditing
              ? "Ticket updated successfully!"
              : "Ticket uploaded successfully!"),
        );
        onSuccess();
        onClose();
      } else if (res?.error && Array.isArray(res.error)) {
        res.error.forEach((err: { message: string }) => {
          toast.error(err.message);
        });
      } else {
        toast.error(
          (typeof res?.error === "string" ? res.error : res?.message) ||
            "Failed to save ticket.",
        );
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCurrentFilePdf = selectedFile
    ? selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf")
    : isPdfFile(ticketToEdit?.file);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isSubmitting && !open && onClose()}>
      <DialogContent className="w-[96vw] max-w-[96vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[92vh] overflow-y-auto rounded-[28px] md:rounded-[36px] p-6 md:p-8 border-gray-100 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary-600/10 text-primary-600 flex items-center justify-center shrink-0">
              <TicketIcon className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                {isEditing ? "Edit Ticket Details" : "Upload Event Ticket"}
              </DialogTitle>
              <DialogDescription className="text-xs md:text-sm text-gray-500 font-medium">
                {isEditing
                  ? "Update ticket details or replace the attached file"
                  : "Store and preserve your event ticket, pass or voucher (PDF or Image)"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Ticket Name */}
          <div className="space-y-2">
            <label
              htmlFor="ticket-name"
              className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5"
            >
              <span>Ticket / Event Name</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              id="ticket-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coldplay: Music of the Spheres Tour"
              required
              disabled={isSubmitting}
              className="w-full h-12 px-4 rounded-2xl bg-gray-50/70 border border-gray-200 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 focus:bg-white transition-all disabled:opacity-50"
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <label
              htmlFor="ticket-date"
              className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5"
            >
              <Calendar className="h-3.5 w-3.5 text-primary-600" />
              <span>Event Date</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              id="ticket-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full h-12 px-4 rounded-2xl bg-gray-50/70 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 focus:bg-white transition-all disabled:opacity-50"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2.5">
            <label
              htmlFor="ticket-tags"
              className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <TagIcon className="h-3.5 w-3.5 text-primary-600" />
                <span>Tags (Optional)</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                Press Enter or comma to add
              </span>
            </label>

            {/* Tag Pills Display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary-600/10 text-primary-700 border border-primary-600/20"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(idx)}
                      disabled={isSubmitting}
                      className="hover:text-rose-600 transition-colors p-0.5 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Input */}
            <div className="flex gap-2">
              <input
                id="ticket-tags"
                type="text"
                value={currentTagInput}
                onChange={(e) => setCurrentTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="e.g. VIP, Concert, London"
                disabled={isSubmitting}
                className="flex-1 h-11 px-4 rounded-2xl bg-gray-50/70 border border-gray-200 text-xs font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 focus:bg-white transition-all disabled:opacity-50"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddTag()}
                disabled={!currentTagInput.trim() || isSubmitting}
                className="h-11 px-4 rounded-2xl text-xs font-black uppercase tracking-wider border-gray-200 hover:bg-gray-50"
              >
                Add
              </Button>
            </div>

            {/* Suggested Tag Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
                Suggestions:
              </span>
              {SUGGESTED_TAGS.map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => handleAddTag(suggested)}
                  disabled={tags.includes(suggested) || isSubmitting}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  +{suggested}
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Zone */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UploadCloud className="h-3.5 w-3.5 text-primary-600" />
                <span>Ticket File (PDF or Image)</span>
                {!isEditing && <span className="text-rose-500">*</span>}
              </span>
              {isEditing && (
                <span className="text-[10px] text-gray-400 font-medium">
                  Leave empty to keep existing file
                </span>
              )}
            </label>

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp,image/jpg"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {/* Drag & Drop Area / Active File Preview */}
            {selectedFile || (isEditing && ticketToEdit?.file) ? (
              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/90 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Thumbnail / Icon */}
                  <div className="h-14 w-14 rounded-xl bg-white border border-gray-200 overflow-hidden relative flex items-center justify-center shrink-0">
                    {isCurrentFilePdf ? (
                      <div className="text-rose-600">
                        <FileText className="h-7 w-7" />
                      </div>
                    ) : filePreviewUrl ? (
                      <Image
                        src={filePreviewUrl}
                        alt="Ticket preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <UploadCloud className="h-6 w-6 text-gray-400" />
                    )}
                  </div>

                  {/* File Metadata */}
                  <div className="min-w-0">
                    <p className="text-xs font-black text-gray-900 truncate">
                      {selectedFile
                        ? selectedFile.name
                        : ticketToEdit?.file?.split("/").pop() || "Current Ticket File"}
                    </p>
                    <p className="text-[11px] font-bold text-gray-400">
                      {selectedFile
                        ? formatFileSize(selectedFile.size)
                        : "Existing uploaded file"}
                    </p>
                  </div>
                </div>

                {/* Change / Clear actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className="h-8 rounded-xl text-xs font-bold border-gray-200 hover:bg-white"
                  >
                    Change
                  </Button>
                  {selectedFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreviewUrl(
                          ticketToEdit?.file ? getImageUrl(ticketToEdit.file) : null,
                        );
                      }}
                      disabled={isSubmitting}
                      className="h-8 w-8 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 rounded-2xl border-2 border-dashed cursor-pointer text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? "border-primary-600 bg-primary-50/40 scale-[0.99]"
                    : "border-gray-200 hover:border-primary-600/50 hover:bg-gray-50/50 bg-gray-50/30"
                }`}
              >
                <div className="h-12 w-12 rounded-2xl bg-primary-600/10 text-primary-600 flex items-center justify-center shadow-xs">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-800 tracking-tight">
                    Click to browse or drag & drop your ticket
                  </p>
                  <p className="text-[11px] font-medium text-gray-400 mt-1">
                    Supports PDF, JPG, PNG, WebP (Max 25MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-11 rounded-2xl text-xs font-black uppercase tracking-wider text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 rounded-2xl text-xs font-black uppercase tracking-widest bg-primary-600 hover:bg-primary-700 text-white gap-2 shadow-lg shadow-primary-600/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isEditing ? "Saving Changes..." : "Uploading..."}</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>{isEditing ? "Update Ticket" : "Upload Ticket"}</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
