type NotificationType = "create" | "delete" | "error" | "fail";

interface IResponseUserData {
  name: string;
  email: string;
  token: string;
}

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IRegisterFormInputs {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

interface IProject {
  user: string;
  client: string;
  projectNr: string;
  payment: number;
  currency: 'USD' | 'EUR' | 'GBP';
  date: Date;
  deleted: boolean;
  paid: boolean;
  comments?: string;
}

export enum ChartType {
  earnings = "earnings",
  clients = "clients",
}

interface IEarningsByMonth {
  date: number;
  payment: number;
  projects: number;
}

interface IEarningsByClient {
  client: string;
  payment: number;
  projects: number;
}

export type { 
  NotificationType,
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
  IProject,
  IEarningsByMonth,
  IEarningsByClient
};
