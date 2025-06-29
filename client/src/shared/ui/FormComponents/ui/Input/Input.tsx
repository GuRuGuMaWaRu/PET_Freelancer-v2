import styles from "./Input.module.css";

const SInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={styles.inputBase} {...props} />;
};

export { SInput };
