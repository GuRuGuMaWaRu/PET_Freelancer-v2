import { useNavigate } from "react-router";

import { SBar, SUserWelcome } from "./TopBar.styles";
import { Button } from "shared/ui";
import { useAuth } from "app";

function TopBar() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <SBar>
      <SUserWelcome>Hi, {auth.user?.name ?? "Handsome Stranger!"}</SUserWelcome>
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
