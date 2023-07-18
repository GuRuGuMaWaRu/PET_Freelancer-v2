/** @jsxImportSource @emotion/react */
import { Outlet, useLoaderData } from "react-router-dom";

import { SRootContainer, SMain } from "./root.styles";
import { TopBar, NavBar } from "widgets";
import { useChangeBGColor } from "shared/lib";

function Root() {
  const data = useLoaderData();

  useChangeBGColor();

  return (
    <SRootContainer>
      <TopBar user={data} />
      <NavBar />
      <SMain>
        <Outlet />
      </SMain>
    </SRootContainer>
  );
}

export { Root };
