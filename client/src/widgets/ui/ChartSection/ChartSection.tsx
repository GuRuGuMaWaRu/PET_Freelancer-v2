import React from "react";
import clsx from "clsx";

import type {
  ChartRange,
  IEarningsByClient,
  IEarningsByMonth,
} from "shared/types";
import { MemoClientsChart, MemoEarningsChart } from "features/charts";

import { ChartRangeDropdown } from "./ChartRangeDropdown/ChartRangeDropdown";
import { ChartType } from "./ChartSection.types";
import { getDateRange } from "./ChartSection.helpers";
import styles from "./ChartSection.module.css";

interface IProps {
  clientChartData: IEarningsByClient[];
  monthsChartData: IEarningsByMonth[];
  chartRange: ChartRange;
  onChartRangeChange: (range: ChartRange) => void;
}

function ChartSection({
  clientChartData,
  monthsChartData,
  chartRange,
  onChartRangeChange,
}: IProps) {
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings
  );

  const dateRange =
    monthsChartData.length > 0
      ? getDateRange(
          monthsChartData[0].date,
          monthsChartData[monthsChartData.length - 1].date
        )
      : "";

  const chartTitle =
    chartType === ChartType.earnings
      ? "Earnings by month"
      : "Earnings by Clients";

  return (
    <div className={styles.chartSection}>
      <div className={styles.chartDataContainer}>
        <h2 className={styles.chartTitle}>{chartTitle}</h2>
        <div className={styles.chartControls}>
          <button
            className={clsx(
              styles.chartSelectionButton,
              chartType === ChartType.earnings && styles.activeBtn
            )}
            onClick={() => setChartType(ChartType.earnings)}
          >
            Earnings
          </button>
          <button
            className={clsx(
              styles.chartSelectionButton,
              chartType === ChartType.clients && styles.activeBtn
            )}
            onClick={() => setChartType(ChartType.clients)}
          >
            Clients
          </button>

          <ChartRangeDropdown
            value={chartRange}
            onChange={onChartRangeChange}
          />
        </div>
      </div>

      <div className={styles.dateRange}>{dateRange || "No data"}</div>

      {chartType === ChartType.earnings ? (
        <MemoEarningsChart data={monthsChartData} />
      ) : (
        <MemoClientsChart data={clientChartData} />
      )}
    </div>
  );
}

export { ChartSection };
