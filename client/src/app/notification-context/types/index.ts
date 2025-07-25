export enum NotificationType {
  "success",
  "warning",
}

interface INotification {
  type: NotificationType;
  message: string;
}

interface INotificationMessageProps {
  type: NotificationType;
}

interface INotificationContext {
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
}

interface INotificationProps {
  notification: INotification | null;
  hideNotification: () => void;
  isShown: boolean;
}

export type {
  INotification,
  INotificationMessageProps,
  INotificationContext,
  INotificationProps,
};
