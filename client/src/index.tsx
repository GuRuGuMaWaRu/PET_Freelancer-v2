import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";

import "./bootstrap";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "app";
import { FullPageError, FullPageSpinner } from "shared/ui";
import { router } from "./router";

// if (process.env.NODE_ENV === "development") {
//   const { server } = require("./test/server/dev-server");
//   console.log("development");
//   server.start();
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={FullPageError}>
      <AppProviders>
        <RouterProvider
          router={router}
          fallbackElement={<FullPageSpinner />}
          future={{ v7_startTransition: true }}
        />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
