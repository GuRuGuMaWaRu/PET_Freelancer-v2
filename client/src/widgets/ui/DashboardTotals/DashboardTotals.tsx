import React from "react";

import type { ChartRange, IEarnings } from "shared/types";

import {
  getEarningsForThisMonth,
  getEarningsForRange,
} from "./DashboardTotals.helpers";
import styles from "./DashboardTotals.module.css";

const CHART_RANGE_LABELS: Record<ChartRange, string> = {
  "3m": "3 months",
  "6m": "6 months",
  "1y": "1 year",
  "2y": "2 years",
  all: "All time",
};

interface IProps {
  data: IEarnings[];
  chartRange: ChartRange;
}

function DashboardTotals({ data, chartRange }: IProps) {
  const earningsForThisMonth = getEarningsForThisMonth(data);
  const earningsForRange = getEarningsForRange(data);

  const now = new Date();
  const monthYearLabel = now.toLocaleDateString("default", {
    month: "short",
    year: "numeric",
  }).toUpperCase();
  const rangeLabel = CHART_RANGE_LABELS[chartRange];

  return (
    <div className={styles.totals}>
      <div>
        <div className={styles.date}>{monthYearLabel}</div>
        <div className={styles.sumContainer}>
          <span className={styles.currencySymbol}>$</span>{" "}
          <span className={styles.sum}>{earningsForThisMonth}</span>
        </div>
      </div>
      <div>
        <div className={styles.date}>{rangeLabel}</div>
        <div className={styles.sumContainer}>
          <span className={styles.currencySymbol}>$</span>{" "}
          <span className={styles.sum}>{earningsForRange}</span>
        </div>
      </div>
    </div>
  );
}

export const MemoDashboardTotals = React.memo(DashboardTotals);
