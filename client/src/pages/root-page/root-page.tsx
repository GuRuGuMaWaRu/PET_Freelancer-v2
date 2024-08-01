/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";

import { TopBar, NavBar } from "widgets";
import { useChangeBGColor } from "shared/lib";
import styles from "./root-page.module.css";

function Root() {
  useChangeBGColor();

  return (
    <div className={styles.rootContainer}>
      <TopBar />
      <NavBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export { Root };
