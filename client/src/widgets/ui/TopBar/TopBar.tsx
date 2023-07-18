import { SBar, SUserWelcome } from "./TopBar.styles";
import { Button } from "shared/ui";

interface IProps {
  user: string;
}

function TopBar({ user }: IProps) {
  return (
    <SBar>
      <SUserWelcome>Hi, {user}</SUserWelcome>
      <Button variant="secondary" onClick={() => console.log("logout")}>
        Logout
      </Button>
    </SBar>
  );
}

export { TopBar };
