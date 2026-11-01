import { defineRoutes, Router } from "@w3cj/ruta";
import { About } from "./pages/About";
import { Home } from "./pages/Home";

const routes = defineRoutes((route) => [
  route("/", Home),
  route("/about", About),
]);

declare module "@w3cj/ruta" {
  interface Register {
    routes: typeof routes;
  }
}

export function App() {
  return <Router routes={routes} />;
}
