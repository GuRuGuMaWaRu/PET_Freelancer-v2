import { Root, ErrorPage, NotFound, Dashboard, dashboardLoader } from "pages";
import {
  Projects,
  projectsLoader,
  projectsAddAction,
  projectsDeleteAction,
  projectsEditAction,
  Clients,
} from "routes";
import { queryClient } from "context";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <div>There's an error</div>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardLoader(queryClient),
          },
          {
            path: "projects",
            element: <Projects />,
            loader: projectsLoader(queryClient),
          },
          {
            path: "projects/add",
            action: projectsAddAction(queryClient),
          },
          {
            path: "projects/:projectId/delete",
            action: projectsDeleteAction(queryClient),
          },
          {
            path: "projects/:projectId/update",
            action: projectsEditAction(queryClient),
          },
          {
            path: "clients",
            element: <Clients />,
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];

export { routes };