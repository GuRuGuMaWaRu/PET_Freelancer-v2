/** @jsxImportSource @emotion/react */
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";

import {
  IProject,
  IEarningsByMonth,
  IEarningsByClient,
  ChartType,
  getProjectsForYear,
} from "../utils";
import {
  MemoDashboardTotals,
  MemoEarningsChart,
  MemoClientsChart,
  Button,
  ChartSelectionButton,
} from "../components";

interface IEarnings {
  id: string;
  date: Date;
  payment: number;
  projects: number;
}

const projectOneYearQuery = () => ({
  queryKey: ["projects", "oneyear"],
  queryFn: async () => {
    const res = await getProjectsForYear();

    return res.data;
  },
});

const loader = (queryClient: QueryClient) => async (): Promise<IProject[]> => {
  const query = projectOneYearQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const formatterUSD = new Intl.NumberFormat("en-US");

const getEarningsByMonths = (projects: IProject[]): IEarnings[] => {
  const earnings: Record<string, IEarnings> = {};
  for (const project of projects) {
    const year = new Date(project.date).getFullYear();
    const month = new Date(project.date).getMonth() + 1;

    if (!earnings[`${year}-${month}`]) {
      earnings[`${year}-${month}`] = {
        id: `${year}-${month}`,
        date: new Date(`${year}-${month}`),
        payment: project.payment * 1000,
        projects: 1,
      };
    } else {
      earnings[`${year}-${month}`].payment += project.payment * 1000;
      earnings[`${year}-${month}`].projects += 1;
    }
  }

  return Object.values(earnings);
};

const getEarningsByClients = (projects: IProject[]): IEarningsByClient[] => {
  const earnings: Record<string, IEarningsByClient> = {};
  for (const project of projects) {
    if (!earnings[project.client]) {
      earnings[project.client] = {
        client: project.client,
        payment: project.payment * 1000,
        projects: 1,
      };
    } else {
      earnings[project.client].payment += project.payment * 1000;
      earnings[project.client].projects += 1;
    }
  }

  return Object.values(earnings)
    .map((item) => ({
      ...item,
      payment: item.payment / 1000,
    }))
    .sort((a, b) => a.payment - b.payment);
};

function Dashboard() {
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings,
  );
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data: projects = [], status, fetchStatus } = useQuery({
    ...projectOneYearQuery(),
    initialData,
  });

  const earningsByMonth = React.useMemo(() => {
    return getEarningsByMonths(projects);
  }, [projects]);

  const earningsForThisMonth = React.useMemo((): string => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const earnings = earningsByMonth.find(
      (item) => item.id === `${year}-${month}`,
    );

    return formatterUSD.format(earnings?.payment ? earnings.payment / 1000 : 0);
  }, [earningsByMonth]);

  const earningsForThisYear = React.useMemo((): string => {
    const year = new Date().getFullYear();

    const total = earningsByMonth.reduce((acc, item) => {
      if (item.date.getFullYear() === year) {
        return acc + item.payment;
      }
      return acc;
    }, 0);

    return formatterUSD.format(total !== 0 ? total / 1000 : 0);
  }, [earningsByMonth]);

  const dataByMonth = React.useMemo((): IEarningsByMonth[] => {
    return earningsByMonth
      .map((item) => ({
        date: item.date.getTime(),
        payment: item.payment / 1000,
        projects: item.projects,
      }))
      .sort((a, b) => a.date - b.date);
  }, [earningsByMonth]);

  const dataByClient = React.useMemo(() => {
    return getEarningsByClients(projects);
  }, [projects]);

  return (
    <>
      <MemoDashboardTotals
        earningsForThisMonth={earningsForThisMonth}
        earningsForThisYear={earningsForThisYear}
      />
      <div
        css={{
          position: "relative",
          marginTop: "4rem",
          maxWidth: "1000px",
          height: "400px",
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <Button>Add Project</Button>
          <div>
            <ChartSelectionButton
              variant="earnings"
              chartType={chartType}
              onClick={() => setChartType(ChartType.earnings)}
            >
              Earnings
            </ChartSelectionButton>{" "}
            <ChartSelectionButton
              variant="clients"
              chartType={chartType}
              onClick={() => setChartType(ChartType.clients)}
            >
              Clients
            </ChartSelectionButton>
          </div>
        </div>
        {chartType === ChartType.earnings ? (
          <MemoEarningsChart data={dataByMonth} />
        ) : (
          <MemoClientsChart data={dataByClient} />
        )}
      </div>
    </>
  );
}

export { Dashboard, loader as dashboardLoader };
