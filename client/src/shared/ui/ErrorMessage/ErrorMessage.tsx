import { colors } from "../../const";

const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

interface Error {
  message?: string;
}

type ErrorVariant = keyof typeof errorMessageVariants;

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
      css={[
        { color: colors.danger, backgroundColor: colors.primary },
        errorMessageVariants[variant],
      ]}
      {...props}
    >
      {variant === "stacked" && <span>There was an error: </span>}
      <pre
        css={[
          { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message ?? "Something bad happened!"}
      </pre>
    </div>
  );
}

export { ErrorMessage };
