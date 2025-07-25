import { Spinner } from "../";
import styles from "./FullPageSpinner.module.css";

function FullPageSpinner() {
  return (
    <div className={styles.fullPageSpinner}>
      <Spinner />
    </div>
  );
}

export { FullPageSpinner };
