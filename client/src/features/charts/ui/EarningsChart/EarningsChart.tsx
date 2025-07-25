import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { colors } from "shared/const";
import { formatDate, formatUSD } from "shared/lib";
import type { IEarningsByMonth } from "shared/types";

import styles from "../charts.module.css";

interface IProps {
  data: IEarningsByMonth[];
}

function EarningsChart({ data }: IProps) {
  return (
    <ResponsiveContainer width={"100%"} height={500} min-width={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          stroke={colors.textImportant}
          tickFormatter={(date) =>
            formatDate(date, {
              year: "numeric",
              month: "numeric",
            })
          }
          tickMargin={10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="payment"
          stroke={colors.textImportant}
          tickMargin={10}
          width={80}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatUSD(value)}
        />
        <Tooltip
          content={({ active, payload }) => {
            return active && payload && payload.length ? (
              <div className={styles.tooltipContainer}>
                <div className={styles.tooltipContents}>
                  <p>
                    <b>Date:</b>{" "}
                    <time>
                      {formatDate(payload[0].payload.date, {
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </p>
                  <p>
                    <b>Earnings:</b> ${payload[0].payload.payment}
                  </p>
                  <p>
                    <b># of projects:</b> {payload[0].payload.projects}
                  </p>
                </div>
              </div>
            ) : null;
          }}
        />

        <Area
          type="monotone"
          dataKey="payment"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const MemoEarningsChart = React.memo(EarningsChart);
