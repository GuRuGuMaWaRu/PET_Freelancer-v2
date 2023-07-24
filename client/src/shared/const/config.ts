export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://localhost/api/v1"
    : "http://localhost:3000/api/v1";

export const LOCAL_STORAGE_KEY = "__FreelancerApp_token__";
export const USERS_KEY = "__FreelancerApp_dev_users__";
export const PROJECTS_KEY = "__FreelancerApp_dev_projects__";

export const PAGE_LIMIT = 15;
