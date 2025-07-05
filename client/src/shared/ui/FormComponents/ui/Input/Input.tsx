import React from "react";
import styles from "./Input.module.css";

const SInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input className={styles.inputBase} ref={ref} {...props} />;
});

const SSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>((props, ref) => {
  return <select className={styles.inputBase} ref={ref} {...props} />;
});

const STextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return <textarea className={styles.inputBase} ref={ref} {...props} />;
});

export { SInput, SSelect, STextarea };
