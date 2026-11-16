const baseUrl = process.env.CHECK_BASE_URL ?? "http://localhost:3000";
const paths = ["/", "/sign-in/", "/sign-up/", "/sign-in/sso-callback?sign_in_fallback_redirect_url=%2Fapp", "/app"];

for (const path of paths) {
  const pageUrl = new URL(path, baseUrl);
  const response = await fetch(pageUrl);
  if (!response.ok) throw new Error(`Page ${pageUrl.pathname} returned HTTP ${response.status}.`);

  const assets: string[] = [];
  const collector: Parameters<HTMLRewriter["on"]>[1] = {
    element(element) {
      const source = element.getAttribute("src") ?? element.getAttribute("href");
      if (source) assets.push(source);
    },
  };
  await new HTMLRewriter()
    .on("script[src]", collector)
    .on('link[rel="stylesheet"][href]', collector)
    .transform(response)
    .text();

  if (assets.length === 0) throw new Error(`No application assets found on ${pageUrl.pathname}.`);

  for (const asset of assets) {
    const assetUrl = new URL(asset, pageUrl);
    if (assetUrl.origin !== pageUrl.origin) continue;
    const assetResponse = await fetch(assetUrl);
    if (!assetResponse.ok) {
      throw new Error(`${pageUrl.pathname} resolves ${asset} to ${assetUrl.pathname}, which returned HTTP ${assetResponse.status}.`);
    }
    if (assetResponse.headers.get("content-type")?.includes("text/html")) {
      throw new Error(`${assetUrl.pathname} returned HTML instead of an application asset.`);
    }
    await assetResponse.body?.cancel();
  }

  console.log(`PASS ${pageUrl.pathname}: page and ${assets.length} application assets are available.`);
}
