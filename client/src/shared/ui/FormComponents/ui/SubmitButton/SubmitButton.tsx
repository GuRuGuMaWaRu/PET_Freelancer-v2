/** @jsxImportSource @emotion/react */
import { Button, Spinner } from "shared/ui";

import styles from "./SubmitButton.module.css";

interface IProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

function SubmitButton({ isLoading = false, children }: IProps) {
  return (
    <div className={styles.container}>
      <Button type="submit" disabled={isLoading}>
        {children}{" "}
        {isLoading ? <Spinner customStyles={{ marginLeft: 7 }} /> : null}
      </Button>
    </div>
  );
}

export { SubmitButton };
