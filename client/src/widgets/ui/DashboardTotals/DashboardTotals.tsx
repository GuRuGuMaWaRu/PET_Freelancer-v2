import React from "react";

import { IEarnings } from "shared/types";

import {
  getEarningsForThisMonth,
  getEarningsForThisYear,
} from "./DashboardTotals.helpers";
import styles from "./DashboardTotals.module.css";

interface IProps {
  data: IEarnings[];
}

function DashboardTotals({ data }: IProps) {
  const earningsForThisMonth = getEarningsForThisMonth(data);
  const earningsForThisYear = getEarningsForThisYear(data);

  const month = new Date()
    .toLocaleDateString("default", { month: "long" })
    .toUpperCase();
  const year = new Date().getFullYear().toString();

  return (
    <div className={styles.totals}>
      <div>
        <div className={styles.date}>{month}</div>
        <div className={styles.sumContainer}>
          <span className={styles.currencySymbol}>$</span>{" "}
          <span className={styles.sum}>{earningsForThisMonth}</span>
        </div>
      </div>
      <div>
        <div className={styles.date}>{year}</div>
        <div className={styles.sumContainer}>
          <span className={styles.currencySymbol}>$</span>{" "}
          <span className={styles.sum}>{earningsForThisYear}</span>
        </div>
      </div>
    </div>
  );
}

export const MemoDashboardTotals = React.memo(DashboardTotals);
