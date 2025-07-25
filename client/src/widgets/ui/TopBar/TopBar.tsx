import { useAuth } from "app";
import { Button } from "shared/ui";

import styles from "./TopBar.module.css";

function TopBar() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.bar}>
      <div className={styles.userWelcome}>Hi, {user?.name}</div>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export { TopBar };
