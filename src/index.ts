import { serve } from "bun";
import index from "./index.html";
import { api } from "./server/app";

const isProduction = process.env.NODE_ENV === "production";
const productionIndex = Bun.file("./dist/index.html");

const serveProductionAsset = async (request: Request) => {
  const pathname = new URL(request.url).pathname;
  const relativePath =
    pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");

  if (relativePath.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const asset = Bun.file(`./dist/${relativePath}`);

  if (await asset.exists()) {
    return new Response(asset, {
      headers: {
        "Cache-Control":
          relativePath === "index.html"
            ? "no-cache"
            : "public, max-age=31536000, immutable",
      },
    });
  }

  if (relativePath.includes(".")) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(productionIndex, {
    headers: { "Cache-Control": "no-cache" },
  });
};

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = isProduction
  ? serve({
      port,
      routes: {
        "/api/*": req => api.fetch(req),
      },
      fetch: serveProductionAsset,
    })
  : serve({
      port,
      routes: {
        "/api/*": req => api.fetch(req),
        "/*": index,
      },
      development: {
        hmr: true,
        console: true,
      },
    });

console.log(`Server running at ${server.url}`);
