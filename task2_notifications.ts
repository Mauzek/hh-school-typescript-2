// ─── Виды уведомлений ─────────────────────
interface SuccessNotification {
  type: "success";
  message: string;
  duration: number;
}

interface ErrorNotification {
  type: "error";
  message: string;
  retry: boolean;
  errorCode: number;
}

interface WarningNotification {
  type: "warning";
  message: string;
}

// Сделал AppNotification вместо Notification(как в задании), потому что Notification уже есть в DOM API и конфликтует с ним
export type AppNotification =
  | SuccessNotification
  | ErrorNotification
  | WarningNotification;

type NotificationType = AppNotification["type"];

// ─── Конфиг ────────────────────────────────────────────────────

export const NOTIFICATION_CONFIG = {
  success: { icon: "✅", color: "#4caf50" },
  error: { icon: "❌", color: "#f44336" },
  warning: { icon: "⚠️", color: "#ff9800" },
} as const satisfies {
  [K in NotificationType]: { icon: string; color: string };
};

export type NotificationPreview = Pick<AppNotification, "type" | "message">;

export type NotificationWithoutMeta = Omit<ErrorNotification, "errorCode">;

export type TrackedNotification = AppNotification & {
  id: string;
  createdAt: Date;
  readAt?: Date;
};

// ─── Функции ────────────────────────────────────────────────────

export function renderNotification(n: AppNotification): string {
  switch (n.type) {
    case "success":
      return `✅ ${n.message} (автозакрытие через ${n.duration}ms)`;
    case "error":
      return `❌ [${n.errorCode}] ${n.message}${n.retry ? " (повтор)" : ""}`;
    case "warning":
      return `⚠️  ${n.message}`;
    default: {
      const _exhaustive: never = n;
      return _exhaustive;
    }
  }
}

export function isErrorNotification(n: AppNotification): n is ErrorNotification {
  return n.type === "error";
}

export function getUnread(
  notifications: TrackedNotification[],
): TrackedNotification[] {
  return notifications.filter((n) => n.readAt === undefined);
}