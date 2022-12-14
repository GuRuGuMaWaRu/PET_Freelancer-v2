import { client } from "./";
import type { IProject, IClient } from './'
import { localStorageKey } from "../config";

const getAllProjects = async () => {
  return await client<IProject[]>("projects");
};

const getProjectsForYear = async () => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IProject[]>("projects/lastYear", { token: token ?? '' });
};

const getAllClients = async () => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IClient[]>("clients", { token: token ?? '' });
};

const addProject = async (project: Partial<IProject>) => {
  console.log(project)
}

export { getAllProjects, getProjectsForYear, getAllClients, addProject };
