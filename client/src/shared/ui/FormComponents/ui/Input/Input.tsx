import styles from "./Input.module.css";

const SInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={styles.inputBase} {...props} />;
};

const SSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return <select className={styles.inputBase} {...props} />;
};

const STextarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  return <textarea className={styles.inputBase} {...props} />;
};

export { SInput, SSelect, STextarea };
