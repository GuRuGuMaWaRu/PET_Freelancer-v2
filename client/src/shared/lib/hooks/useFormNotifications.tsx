import React from "react";
import { useNotification } from "app";

const useFormNotifications = (fetcherData: any, isLoading: boolean) => {
  const notify = useNotification();

  //** Show SUCCESS or WARNING message */
  React.useEffect(() => {
    if (fetcherData && !isLoading) {
      if (fetcherData.status === "success") {
        notify.showSuccess(fetcherData.message);
      } else {
        notify.showWarning(fetcherData.message);
      }
    }
  }, [fetcherData, isLoading, notify]);
};

export { useFormNotifications };
