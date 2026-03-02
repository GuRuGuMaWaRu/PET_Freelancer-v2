// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./test/server/test-server";

// Avoid loading ESM-only deps (e.g. copy-anything) pulled in by React Query Devtools.
jest.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => null,
}));

// NotificationProvider portals into this element; ensure it exists in tests.
beforeAll(() => {
  const root = document.createElement("div");
  root.setAttribute("id", "notification-root");
  document.body.appendChild(root);
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
