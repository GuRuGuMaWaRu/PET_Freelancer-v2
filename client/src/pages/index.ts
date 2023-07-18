export * from "./404/not-found";
export * from "./error-page/error-page";

export * from "./root/root";
export { loader as rootLoader } from "./root/root.loader";
export * from "./auth/auth";
export { action as loginAction } from "./login/login.action";
export * from "./dashboard/dashboard";
export { loader as dashboardLoader } from "./dashboard/dashboard.loader";
export * from "./projects/projects";
export { loader as projectsLoader } from "./projects/projects.loader";
export { action as projectsAddAction } from "./projects-add/projects-add.action";
export { action as projectsDeleteAction } from "./projects-delete/projects-delete.action";
export { action as projectsEditAction } from "./projects-edit/projects-edit.action";
export * from "./clients/clients";
export { loader as clientsLoader } from "./clients/clients.loader";
