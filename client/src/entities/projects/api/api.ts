import { apiClient } from "shared/api";
import type { IProject, IProjectPaginatedData } from "shared/types";
import { config } from "shared/const";

const getProjectsForYear = async () => {
  return await apiClient.get<IProject[]>("projects/lastYear");
};

const getPageOfProjects = async (
  pageParam: number,
  sortParam?: string,
  searchQuery?: string
) => {
  const sort = sortParam ? `&sort=${sortParam}` : "";
  const page = `page=${pageParam}&limit=${config.PAGE_LIMIT}`;
  const search = searchQuery ? `&q=${searchQuery}` : "";

  return await apiClient.get<IProjectPaginatedData>(
    `projects/?${page}${sort}${search}`
  );
};

const addProject = async (project: Partial<IProject>) => {
  return await apiClient.post<IProject>("projects", { data: project });
};

const deleteProject = async (projectId: string) => {
  return await apiClient.delete<null>(`projects/${projectId}`, {
    method: "DELETE",
  });
};

const editProject = async (projectId: string, project: Partial<IProject>) => {
  return await apiClient.patch<IProject>(`projects/${projectId}`, {
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
