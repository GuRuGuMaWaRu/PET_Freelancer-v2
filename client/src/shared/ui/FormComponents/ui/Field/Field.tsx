import React from "react";
import { FieldError } from "react-hook-form";

import { ErrorMessage } from "shared/ui";

import { getChildId } from "../../lib/helpers";
import styles from "./Field.module.css";

interface IProps {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: FieldError;
}

function Field({ label, children, htmlFor, error }: IProps) {
  const id = htmlFor || getChildId(children);

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <ErrorMessage error={{ message: error.message }} variant="inline" />
      )}
    </div>
  );
}

export { Field };
