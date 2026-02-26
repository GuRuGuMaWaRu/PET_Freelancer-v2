import { Button, Spinner } from "shared/ui";

interface IProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

function SubmitButton({ isLoading = false, children }: IProps) {
  return (
    <Button type="submit" disabled={isLoading}>
      {children}{" "}
      {isLoading ? <Spinner customStyles={{ marginLeft: 7 }} /> : null}
    </Button>
  );
}

export { SubmitButton };
