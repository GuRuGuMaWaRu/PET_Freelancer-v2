interface Error {
  message: string | undefined;
}

type ErrorVariant = "stacked" | "inline";

enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

interface IProject {
  _id: string;
  user: string;
  client: IClient;
  projectNr: string;
  payment: number;
  currency: Currency;
  date: Date;
  deleted: boolean;
  paid: boolean;
  comments?: string;
}

interface IProjectPaginatedData {
  docs: IProject[];
  allDocs: number;
}

interface IClient {
  _id: string;
  name: string;
}

interface IEarningsByClient {
  client: string;
  payment: number;
  projects: number;
}

interface IEarningsByMonth {
  date: number;
  payment: number;
  projects: number;
}

interface IEarnings {
  id: string;
  date: Date;
  payment: number;
  projects: number;
}

/** Dashboard chart time range: 3m, 6m, 1y, 2y, or all time */
type ChartRange = "3m" | "6m" | "1y" | "2y" | "all";

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
  password: string;
  confirmPassword: string;
}

enum NotificationType {
  "success",
  "warning",
}

interface INotification {
  type: NotificationType;
  message: string;
}

interface INotificationProps {
  notification: INotification | null;
  hideNotification: () => void;
  isShown: boolean;
}

export type {
  ChartRange,
  Error,
  ErrorVariant,
  IProject,
  IProjectPaginatedData,
  IClient,
  IEarningsByClient,
  IEarningsByMonth,
  IEarnings,
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
  INotification,
  INotificationProps,
};

export { NotificationType, Currency };
