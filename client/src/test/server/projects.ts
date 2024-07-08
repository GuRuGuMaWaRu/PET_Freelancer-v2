import { CONFIG } from "../../shared/const";
import { buildProject } from "../generate";
import type { IProject } from "../../shared/types";

let projects: IProject[] = [];

// initialize
// load();

function persist() {
  window.localStorage.setItem(CONFIG.PROJECTS_KEY, JSON.stringify(projects));
}
function load() {
  Object.assign(
    projects,
    JSON.parse(window.localStorage.getItem(CONFIG.PROJECTS_KEY) || "[]")
  );
}

function bootstrapFakeProjects(
  num = Math.floor(Math.random() * 1000) + 1
): void {
  for (let i = 0; i < num; i++) {
    projects.push(buildProject());
  }
}

function getProjects(): IProject[] {
  return projects;
}

function getProjectsForYear(): IProject[] {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  return projects.filter((project) => {
    return project.date >= startDate;
  });
}

function addProject(project: IProject): void {
  projects.push(project);
  persist();
}

function updateProject(project: IProject): void {
  const index = projects.findIndex((p) => p._id === project._id);

  if (index) {
    projects[index] = project;
    persist();
  }
}

// bootstrap
bootstrapFakeProjects();

export type { IProject };
export { getProjects, getProjectsForYear, addProject, updateProject };
