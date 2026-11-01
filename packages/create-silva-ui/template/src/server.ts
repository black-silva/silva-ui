import { Hono } from "hono";

const app = new Hono();

app.get("/api/message", (c) => {
  return c.json({ message: "Hello from Hono" });
});

app.post("/api/message", async (c) => {
  const { message } = await c.req.json<{ message?: string }>();
  return c.json({ message: message ?? "Message received" }, 201);
});

export default app;
