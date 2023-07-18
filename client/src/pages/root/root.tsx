/** @jsxImportSource @emotion/react */
import { Outlet, useLoaderData } from "react-router-dom";

import { SRootContainer, SMain } from "./root.styles";
import { loader } from "./root.loader";
import { TopBar, NavBar } from "widgets";
import { useChangeBGColor } from "shared/lib";

function Root() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useChangeBGColor();

  return (
    <SRootContainer>
      <TopBar user={data?.name} />
      <NavBar />
      <SMain>
        <Outlet />
      </SMain>
    </SRootContainer>
  );
}

export { Root };
