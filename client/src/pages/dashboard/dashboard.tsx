import { MemoDashboardTotals, ChartSection } from "widgets";
import { ModalAddProject } from "entities/projects";
import { useDashboardData } from "./dashboard.hooks";
import styles from "./dashboard.module.css";

function Dashboard() {
  const { earningsByMonth, dataByClient, dataByMonth, clients } =
    useDashboardData();

  return (
    <>
      <div className={styles.controlsSection}>
        <ModalAddProject clients={clients} />
      </div>
      <MemoDashboardTotals data={earningsByMonth} />
      <ChartSection
        clientChartData={dataByClient}
        monthsChartData={dataByMonth}
      />
    </>
  );
}

export { Dashboard };
