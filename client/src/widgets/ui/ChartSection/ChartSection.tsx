import React from "react";
import clsx from "clsx";

import { ChartType } from "./ChartSection.types";
import { getDateRange } from "./ChartSection.helpers";
import type { IEarningsByClient, IEarningsByMonth } from "shared/types";
import { MemoClientsChart, MemoEarningsChart } from "features/charts";

import styles from "./ChartSection.module.css";

interface IProps {
  clientChartData: IEarningsByClient[];
  monthsChartData: IEarningsByMonth[];
}

function ChartSection({ clientChartData, monthsChartData }: IProps) {
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings
  );

  const dateRange = getDateRange(
    monthsChartData[0].date,
    monthsChartData[monthsChartData.length - 1].date
  );

  const chartTitle =
    chartType === ChartType.earnings
      ? "Earnings by month"
      : "Earnings by Clients";

  return (
    <div className={styles.chartSection}>
      <div className={styles.chartDataContainer}>
        <h2 className={styles.chartTitle}>{chartTitle}</h2>
        <div>
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
        </div>
      </div>
      <div className={styles.dateRange}>{dateRange}</div>
      {chartType === ChartType.earnings ? (
        <MemoEarningsChart data={monthsChartData} />
      ) : (
        <MemoClientsChart data={clientChartData} />
      )}
    </div>
  );
}

export { ChartSection };
