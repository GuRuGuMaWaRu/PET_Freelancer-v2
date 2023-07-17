import { SBar, SUserWelcome } from "./TopBar.styles";
import { Button } from "shared/ui";

function TopBar() {
  return (
    <SBar>
      <SUserWelcome>Hi, Bobur</SUserWelcome>
      <Button variant="secondary" onClick={() => console.log("logout")}>
        Logout
      </Button>
    </SBar>
  );
}

export { TopBar };
