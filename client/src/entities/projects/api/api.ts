import { client } from "shared/api";
import type { IProject, IProjectPaginatedData } from "shared/types";
import { CONFIG } from "shared/const";

const getProjectsForYear = async () => {
  return await client<IProject[]>("projects/lastYear");
};

const getPageOfProjects = async (
  pageParam: number,
  sortParam?: string,
  searchQuery?: string
) => {
  const sort = sortParam ? `&sort=${sortParam}` : "";
  const page = `page=${pageParam}&limit=${CONFIG.PAGE_LIMIT}`;
  const search = searchQuery ? `&q=${searchQuery}` : "";

  return await client<IProjectPaginatedData>(
    `projects/?${page}${sort}${search}`
  );
};

const addProject = async (project: Partial<IProject>) => {
  return await client<IProject>("projects", { data: project });
};

const deleteProject = async (projectId: string) => {
  return await client<null>(`projects/${projectId}`, { method: "DELETE" });
};

const editProject = async (projectId: string, project: Partial<IProject>) => {
  return await client<IProject>(`projects/${projectId}`, {
    data: project,
    method: "PATCH",
  });
};

export {
  getProjectsForYear,
  getPageOfProjects,
  addProject,
  deleteProject,
  editProject,
};
