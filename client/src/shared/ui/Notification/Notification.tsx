import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useTransition, animated } from "react-spring";
import { FaTimes, FaExclamationCircle, FaCheck } from "react-icons/fa";

import { config } from "shared/const";
import type { INotificationProps } from "shared/types";
import { NotificationType } from "shared/types";

import notificationStyles from "./Notification.module.css";

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.success:
      return (
        <FaCheck
          className={clsx(
            notificationStyles.iconBase,
            notificationStyles.successIcon
          )}
        />
      );
    case NotificationType.warning:
      return (
        <FaExclamationCircle
          className={clsx(
            notificationStyles.iconBase,
            notificationStyles.warningIcon
          )}
        />
      );
    default:
      return (
        <FaExclamationCircle
          className={clsx(
            notificationStyles.iconBase,
            notificationStyles.warningIcon
          )}
        />
      );
  }
};

function Notification({
  notification,
  hideNotification,
  isShown,
}: INotificationProps) {
  const transitions = useTransition(isShown, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 },
    delay: 200,
  });
  const timeoutId = useRef<number>();

  useEffect(() => {
    if (notification) {
      timeoutId.current = window.setTimeout(
        () => hideNotification(),
        config.NOTIFICATION_DURATION
      );
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [notification, hideNotification]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    hideNotification();
  };

  const notificationType = notification?.type ?? NotificationType.warning;

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          role="alert"
          aria-label="notification"
          className={clsx(notificationStyles.notification)}
          style={{
            transform: styles.y.to(
              (value) => `translateY(${value}px) translateX(-50%)`
            ),
            opacity: styles.opacity,
          }}
        >
          <>
            {getNotificationIcon(notificationType)}
            {notification?.message || "Oops! Something unexpected happened!"}
            <FaTimes
              onClick={handleCloseNotification}
              className={notificationStyles.closeIcon}
            />
          </>
        </animated.div>
      )
  );
}

export { Notification };
