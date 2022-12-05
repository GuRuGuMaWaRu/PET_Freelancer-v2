/** @jsxImportSource @emotion/react */
import { NavLink, Outlet } from "react-router-dom";

import * as colors from "../styles/colors";
import { useAuth } from "../context";
import { Button } from "../components";

function TopBar() {
  const { user, logout } = useAuth();

  return (
    <div
      css={{
        gridColumn: "1 / span 5",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridGap: "20px",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "right" }}>Hi, {user?.name}</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

const navLinks = [
  { to: "/", name: "Main" },
  { to: "projects", name: "Projects" },
  { to: "clients", name: "Clients" },
];

function Nav() {
  return (
    <div css={{ gridColumn: "1 / 1", gridRow: "2 / 2" }}>
      <nav css={{ position: "fixed" }}>
        <ul
          css={{
            listStyle: "none",
            padding: 0,
            marginTop: 0,
          }}
        >
          {navLinks.map(({ to, name }) => (
            <li key={name}>
              <NavLink
                to={to}
                style={({ isActive, isPending }) => ({
                  color: colors.text,
                  display: "block",
                  padding: "8px 15px 8px 10px",
                  margin: "15px 0",
                  borderLeft: `5px solid ${
                    isActive ? colors.text : "transparent"
                  }`,
                  textDecoration: "none",
                  // opacity: isActive ? 1 : 0.5,
                })}
                end={to === "/" ? true : false}
              >
                <h3>{name}</h3>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Root() {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "100px 90%",
        gridGap: "10px",
        color: colors.text,
        maxWidth: "1200px",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <TopBar />
      <Nav />
      <main css={{ gridColumn: "2 / span 4" }}>
        <Outlet />
      </main>
    </div>
  );
}

export { Root };
