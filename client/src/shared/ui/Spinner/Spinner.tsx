import { FaSpinner } from "react-icons/fa";

import styles from "./Spinner.module.css";

interface IProps {
  customStyles?: React.CSSProperties;
}

const Spinner = ({ customStyles }: IProps) => {
  return (
    <FaSpinner
      className={styles.spinner}
      aria-label="loading"
      style={customStyles}
    />
  );
};

export { Spinner };
