import styles from "./ErrorMessage.module.css";

interface Error {
  message?: string;
}

type ErrorVariant = "stacked" | "inline";

interface ErrorMessageProps {
  error: Error;
  variant?: ErrorVariant;
}

function ErrorMessage({
  error,
  variant = "stacked",
  ...props
}: ErrorMessageProps & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={`${styles.errorContainer} ${styles[variant]}`}
      {...props}
    >
      {variant === "stacked" && <span>There was an error: </span>}
      <pre className={`${styles.errorMessage} ${styles[variant]}`}>
        {error.message ?? "Something bad happened!"}
      </pre>
    </div>
  );
}

export { ErrorMessage };
