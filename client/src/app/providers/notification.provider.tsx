import React, { useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";

import type { INotification } from "shared/types";
import { NotificationType } from "shared/types";
import { Notification } from "shared/ui";

interface INotificationContext {
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
}

const NotificationContext = React.createContext<INotificationContext>(
  {} as INotificationContext
);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<INotification | null>(null);
  const [isShown, setIsShown] = useState<boolean>(false);

  const showNotification = useCallback(
    (type: NotificationType, message: string) => {
      setNotification({ type, message });
      setIsShown(true);
    },
    []
  );
  const hideNotification = useCallback(() => setIsShown(false), []);

  const showSuccess = useCallback(
    (message: string) => {
      showNotification(NotificationType.success, message);
    },
    [showNotification]
  );
  const showWarning = useCallback(
    (message: string) => {
      showNotification(NotificationType.warning, message);
    },
    [showNotification]
  );

  const value = useMemo(
    () => ({
      showSuccess,
      showWarning,
    }),
    [showSuccess, showWarning]
  );

  const notificationRoot = document.getElementById("notification-root");

  if (!notificationRoot) {
    throw new Error("Notification root element not found");
  }

  return (
    <NotificationContext.Provider value={value}>
      {ReactDOM.createPortal(
        <Notification
          notification={notification}
          isShown={isShown}
          hideNotification={hideNotification}
        />,
        notificationRoot
      )}
      {children}
    </NotificationContext.Provider>
  );
}

const useNotification = () => {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification should be used inside NotificationProvider"
    );
  }

  return context;
};

export { NotificationProvider, useNotification };
