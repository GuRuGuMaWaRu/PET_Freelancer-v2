import { useNavigate } from "react-router";

import { SBar, SUserWelcome } from "./TopBar.styles";
import { Button } from "shared/ui";
import { useAuth } from "app";

interface IProps {
  user?: string;
}

function TopBar({ user = "Handsome Stranger!" }: IProps) {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <SBar>
      <SUserWelcome>Hi, {user}</SUserWelcome>
      <Button
        variant="secondary"
        onClick={() => auth.logout(() => navigate("/auth"))}
      >
        Logout
      </Button>
    </SBar>
  );
}

export { TopBar };
