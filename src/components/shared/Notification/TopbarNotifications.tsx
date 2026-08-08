"use client";

import * as React from "react";
import { Bell, Check, Sparkles, Inbox, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { io, type Socket } from "socket.io-client";
import {
  getNotificationsAction,
  readAllNotificationsAction,
  readNotificationAction,
  type NotificationItem,
} from "./actions";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface TopbarNotificationsProps {
  userId?: string;
  className?: string;
}

const PAGE_LIMIT = 10;

function formatTime(iso?: string) {
  if (!iso) return "";
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return "";
  }
}

/** Strip origin (e.g. showe-web.vercel.app) and return an in-app path + query. */
function toAppPath(extraPath: string): string | null {
  const trimmed = extraPath.trim();
  if (!trimmed) return null;

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const url = new URL(trimmed);
      return `${url.pathname}${url.search}${url.hash}` || null;
    }
  } catch {
    // fall through
  }

  // Already relative, or a full URL we failed to parse — clip to first "/"
  const slash = trimmed.indexOf("/");
  if (slash >= 0) return trimmed.slice(slash);
  return `/${trimmed}`;
}

export function TopbarNotifications({ userId, className }: TopbarNotificationsProps) {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const loadingMoreRef = React.useRef(false);

  const hasMore = page < totalPage;

  const loadNotifications = React.useCallback(async () => {
    if (!userId) return;

    setIsFetching(true);
    const res = await getNotificationsAction(1, PAGE_LIMIT);
    if (res.success && res.data) {
      setNotifications(res.data.data ?? []);
      setUnreadCount(res.data.unreadCount ?? 0);
      setPage(res.pagination?.page ?? 1);
      setTotalPage(res.pagination?.totalPage ?? 1);
    } else if (res.message) {
      toast.error(res.message || "Failed to load notifications.");
    }
    setIsFetching(false);
  }, [userId]);

  const loadMore = React.useCallback(async () => {
    if (loadingMoreRef.current || page >= totalPage) return;

    loadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    const res = await getNotificationsAction(nextPage, PAGE_LIMIT);
    if (res.success && res.data) {
      const incoming = res.data.data ?? [];
      setNotifications((prev) => {
        const seen = new Set(prev.map((n) => n._id));
        const fresh = incoming.filter((n) => !seen.has(n._id));
        return fresh.length ? [...prev, ...fresh] : prev;
      });
      setUnreadCount(res.data.unreadCount ?? 0);
      setPage(res.pagination?.page ?? nextPage);
      if (res.pagination?.totalPage) setTotalPage(res.pagination.totalPage);
    }

    loadingMoreRef.current = false;
    setIsLoadingMore(false);
  }, [page, totalPage]);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 140) {
        void loadMore();
      }
    },
    [loadMore],
  );

  React.useEffect(() => {
    if (open) void loadNotifications();
  }, [loadNotifications, open]);

  React.useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  React.useEffect(() => {
    if (!userId) return;

    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      process.env.SOCKET_URL ||
      "";

    if (!socketUrl) return;

    const socket: Socket = io(socketUrl, {
      transports: ["websocket"],
      auth: { token: Cookies.get("accessToken") },
    });

    const eventName = `get-notification::${userId}`;
    socket.on(eventName, () => {
      void loadNotifications();
    });

    return () => {
      socket.off(eventName);
      socket.disconnect();
    };
  }, [loadNotifications, userId]);

  const handleRead = async (notification: NotificationItem) => {
    if (notification.isRead) return true;

    const previous = notifications;
    setNotifications((current) =>
      current.map((item) =>
        item._id === notification._id ? { ...item, isRead: true } : item,
      ),
    );
    setUnreadCount((current) => Math.max(0, current - 1));

    const res = await readNotificationAction(notification._id);
    if (!res.success) {
      setNotifications(previous);
      setUnreadCount((current) => current + 1);
      toast.error(res.message || "Failed to update notification.");
      return false;
    }
    return true;
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    await handleRead(notification);

    const raw = notification.extraPath;
    if (!raw) return;

    const path = toAppPath(raw);
    if (!path) return;

    setOpen(false);
    router.push(path);
  };

  const handleReadAll = async () => {
    if (!notifications.length || unreadCount === 0) return;

    const previous = notifications;
    setNotifications((current) => current.map((item) => ({ ...item, isRead: true })));
    setUnreadCount(0);

    const res = await readAllNotificationsAction();
    if (!res.success) {
      setNotifications(previous);
      setUnreadCount(previous.filter((item) => !item.isRead).length);
      toast.error(res.message || "Failed to update notifications.");
    }
  };

  if (!userId) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className={cn(
            "relative h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80",
            "hover:bg-white/10 hover:text-white hover:border-accent-400/40",
            "transition-all duration-200",
            className,
          )}
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-400 px-1 text-[10px] font-black text-primary-600 shadow-md shadow-accent-400/30">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[min(100vw-1.5rem,24rem)] overflow-hidden rounded-2xl border border-white/10 bg-primary-600 p-0 text-white shadow-2xl shadow-black/40"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-4 py-3.5 bg-[#013D43]/80">
          <div>
            <DropdownMenuLabel className="flex items-center gap-2 p-0 text-[14px] font-semibold text-white">
              Notifications
              {unreadCount > 0 && (
                <span className="rounded-md border border-[#F5A800]/30 bg-[#F5A800]/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#F5A800]">
                  {unreadCount} new
                </span>
              )}
            </DropdownMenuLabel>
          </div>

          {notifications.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReadAll}
              disabled={isFetching || unreadCount === 0}
              className="h-8 gap-1 rounded-lg text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-40"
            >
              <Check className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        <DropdownMenuSeparator className="m-0 bg-white/10" />

        <div
          onScroll={handleScroll}
          className="max-h-105 divide-y divide-white/5 overflow-y-auto no-scrollbar"
        >
          {isFetching && notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <Loader2 className="mb-3 h-5 w-5 animate-spin text-[#F5A800]" />
              <p className="text-sm text-white/50">Loading notifications…</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40">
                <Inbox className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-white/80">All caught up</p>
              <p className="mt-1 text-xs text-white/45">You have no new notifications.</p>
            </div>
          ) : (
            <>
              {notifications.map((notification) => (
                <button
                  key={notification._id}
                  type="button"
                  className={cn(
                    "group relative block w-full px-4 py-3.5 text-left transition-all duration-150 hover:bg-white/8",
                    !notification.isRead && "bg-[#F5A800]/6",
                  )}
                  onClick={() => void handleNotificationClick(notification)}
                >
                  {!notification.isRead && (
                    <div className="absolute top-0 bottom-0 left-0 w-0.75 rounded-r-md bg-[#F5A800] transition-colors group-hover:bg-[#ffb81a]" />
                  )}

                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                        notification.isRead
                          ? "border-white/10 bg-white/5 text-white/40"
                          : "border-[#F5A800]/30 bg-[#F5A800]/15 text-[#F5A800]",
                      )}
                    >
                      <Sparkles className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "truncate text-xs tracking-wide",
                            notification.isRead
                              ? "font-medium text-white/55"
                              : "font-semibold text-white",
                          )}
                        >
                          {notification.title}
                        </p>

                        {!notification.isRead && (
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5A800] shadow-sm shadow-[#F5A800]/50" />
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-white/50 transition-colors group-hover:text-white/70">
                        {notification.message}
                      </p>
                      {notification.createdAt && (
                        <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-white/30">
                          {formatTime(notification.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}

              {isLoadingMore && (
                <div className="flex items-center justify-center gap-2 py-3 text-xs text-white/45">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#F5A800]" />
                  Loading more…
                </div>
              )}
              {!hasMore && notifications.length > 0 && (
                <p className="py-3 text-center text-[11px] text-white/30">
                  No more notifications
                </p>
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
