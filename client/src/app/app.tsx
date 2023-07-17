/** @jsxImportSource @emotion/react */
import React from "react";

import { FullPageSpinner } from "shared/ui";

const AppUnauthenticated = React.lazy(
  () => import("pages/app-unauthenticated/app-unauthenticated")
);
const AppAuthenticated = React.lazy(
  () =>
    /* webpackPrefetch: true */ import(
      "pages/app-authenticated/app-authenticated"
    )
);

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {"Bobur" ? <AppAuthenticated /> : <AppUnauthenticated />}
    </React.Suspense>
  );
}

export { App };
