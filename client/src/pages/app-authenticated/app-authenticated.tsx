import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { FullPageSpinner } from "shared/ui";
import { routes } from "../routes";

const router = createBrowserRouter(routes);

function AppAuthenticated() {
  return (
    <RouterProvider router={router} fallbackElement={<FullPageSpinner />} />
  );
}

export default AppAuthenticated;
