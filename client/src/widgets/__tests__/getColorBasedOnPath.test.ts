import { colors } from "shared/const";
import { getColorBasedOnPath } from "../lib/helpers";

describe("getColorBasedOnPath", () => {
  it("returns dashboard color for the / route", () => {
    expect(getColorBasedOnPath("/")).toBe(colors.dashboardPageBg);
  });

  it("returns dashboard color as default for unknown paths", () => {
    expect(getColorBasedOnPath("/abc")).toBe(colors.dashboardPageBg);
  });

  it("returns projects color for /projects route", () => {
    expect(getColorBasedOnPath("/projects")).toBe(colors.projectsPageBg);
  });

  it("returns clients color for /clients route", () => {
    expect(getColorBasedOnPath("/clients")).toBe(colors.clientsPageBg);
  });
});
