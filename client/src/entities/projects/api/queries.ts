import type { ChartRange } from "shared/types";
import { getProjectsForChart, getPageOfProjects } from "./api";

export const chartRangeToMonths = (range: ChartRange): number => {
  const map: Record<ChartRange, number> = {
    "3m": 3,
    "6m": 6,
    "1y": 12,
    "2y": 24,
    all: 0,
  };
  return map[range];
};

const getProjectsForChartQuery = (chartRange: ChartRange) => ({
  queryKey: ["projects", "forChart", chartRange] as const,
  queryFn: async () => {
    const months = chartRangeToMonths(chartRange);
    const res = await getProjectsForChart(months);
    return res.data;
  },
  keepPreviousData: true,
});

const getProjectsPageQuery = (
  page: number,
  sortColumn?: string,
  searchQuery?: string,
) => ({
  queryKey: ["projects", { page, sortColumn, searchQuery }],
  queryFn: async () => {
    const res = await getPageOfProjects(page, sortColumn, searchQuery);

    return res.data;
  },
  keepPreviousData: true,
});

export { getProjectsForChartQuery, getProjectsPageQuery };
