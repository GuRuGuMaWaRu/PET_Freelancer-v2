import React from "react";
import { SlArrowDown } from "react-icons/sl";

import type { ChartRange } from "shared/types";
import { Dropdown } from "shared/ui";

import styles from "./ChartRangeDropdown.module.css";

const CHART_RANGE_OPTIONS: { value: ChartRange; label: string }[] = [
  { value: "3m", label: "3 months" },
  { value: "6m", label: "6 months" },
  { value: "1y", label: "1 year" },
  { value: "2y", label: "2 years" },
  { value: "all", label: "All time" },
];

const DROPDOWN_STYLES: React.CSSProperties = {
  top: "38px",
  left: 0,
  right: "unset",
  width: "205px",
  padding: 0,
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderRadius: "5px",
  background: "rgba(255, 255, 255, 0.12)",
  color: "var(--color-white)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
};

interface IProps {
  value: ChartRange;
  onChange: (range: ChartRange) => void;
}

function ChartRangeDropdown({ value, onChange }: IProps) {
  const label =
    CHART_RANGE_OPTIONS.find((o) => o.value === value)?.label ?? value;

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className={styles.triggerButton}
          aria-label="Chart time range"
        >
          <span>{label}</span>
          <SlArrowDown className={styles.triggerIcon} />
        </button>
      }
      menu={CHART_RANGE_OPTIONS.map((option) => (
        <div
          key={option.value}
          className={styles.menuItem}
          onClick={() => onChange(option.value)}
          role="option"
          aria-selected={option.value === value}
        >
          {option.label}
        </div>
      ))}
      dropdownStyles={DROPDOWN_STYLES}
    />
  );
}

export { ChartRangeDropdown };
