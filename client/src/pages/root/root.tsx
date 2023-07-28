/** @jsxImportSource @emotion/react */
import { Outlet, useLoaderData } from "react-router-dom";

import { loader } from "./root.loader";
import { SRootContainer, SMain } from "./root.styles";
import { TopBar, NavBar } from "widgets";
import { useChangeBGColor } from "shared/lib";

function Root() {
  const user = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useChangeBGColor();

  return (
    <SRootContainer>
      <TopBar user={user} />
      <NavBar />
      <SMain>
        <Outlet />
      </SMain>
    </SRootContainer>
  );
}

export { Root };
