import type { Error } from "../../types";
import styles from "./FullPageError.module.css";

function FullPageError({ error }: { error: Error }) {
  return (
    <div className={styles.container} role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export { FullPageError };
