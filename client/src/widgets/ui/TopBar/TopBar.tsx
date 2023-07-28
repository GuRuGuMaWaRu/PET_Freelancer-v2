import { useNavigate } from "react-router";

import { SBar, SUserWelcome } from "./TopBar.styles";
import { Button } from "shared/ui";
import { useAuth } from "app";
import { IResponseUserData } from "shared/types";

function TopBar({ user }: { user: IResponseUserData | null }) {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <SBar>
      <SUserWelcome>Hi, {user?.name ?? "Handsome Stranger!"}</SUserWelcome>
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
