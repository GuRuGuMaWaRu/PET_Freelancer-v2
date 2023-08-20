/** @jsxImportSource @emotion/react */
import { Outlet, useLoaderData } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import { loader } from "./root.loader";
import { SRootContainer, SMain } from "./root.styles";
import { TopBar, NavBar } from "widgets";
import { useChangeBGColor } from "shared/lib";

function Root() {
  const user = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useChangeBGColor();

  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <SRootContainer>
        <TopBar user={user} />
        <NavBar />
        <SMain>
          <Outlet />
        </SMain>
      </SRootContainer>
    </QueryParamProvider>
  );
}

export { Root };
