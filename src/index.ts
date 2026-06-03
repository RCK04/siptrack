import { serve } from "bun";
import index from "./index.html";
import { api } from "./server/app";

const server = serve({
  port: process.env.PORT ? Number(process.env.PORT) : 3000,

  routes: {
    "/api/*": req => api.fetch(req),
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
