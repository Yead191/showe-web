"use server";

import { nextFetch } from "@/helpers/next-fetch/NextFetch";

export interface NotificationItem {
  _id: string;
  title: string;
  receiver: string[];
  message: string;
  filePath?: string;
  /** Absolute or relative deep-link, e.g. https://showe-web.vercel.app/reader/...?page=2 */
  extraPath?: string;
  isRead: boolean;
  readers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsPayload {
  unreadCount: number;
  data: NotificationItem[];
}

export async function getNotificationsAction(page = 1, limit = 10) {
  return nextFetch<NotificationsPayload>(
    `/notification?page=${page}&limit=${limit}`,
    {
      method: "GET",
      cache: "no-store",
      tags: ["notification"],
    },
  );
}

export async function readNotificationAction(id: string) {
  return nextFetch(`/notification/${id}`, {
    method: "PATCH",
  });
}

export async function readAllNotificationsAction() {
  return nextFetch("/notification", {
    method: "PATCH",
  });
}
