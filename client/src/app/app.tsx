import React from "react";

import { useAuth } from ".";
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
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AppAuthenticated /> : <AppUnauthenticated />}
    </React.Suspense>
  );
}

export { App };
