import clsx from "clsx";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  customStyles?: React.CSSProperties;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  customStyles = {},
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.customButton, styles[variant])}
      style={customStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
