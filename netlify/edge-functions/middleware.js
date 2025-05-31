export default async (request, context) => {
  const url = new URL(request.url);

  // 1. Handle /api/Account/Login as a POST endpoint
  if (
    url.pathname === "/api/Account/Login" &&
    request.method === "POST"
  ) {
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }

  // 2. Try to map /foo to /foo.json (but only if /foo.json exists)
  if (
    !url.pathname.endsWith(".json") &&
    url.pathname !== "/api/Account/Login"
  ) {
    // Try to fetch the .json file from your published site assets
    const jsonPath = url.pathname.replace(/\/$/, "") + ".json";
    const assetUrl = new URL(jsonPath, url.origin);

    // Try to HEAD the file to see if it exists
    const res = await fetch(assetUrl, { method: "HEAD" });
    if (res.ok) {
      // Rewrite the request to /foo.json
      url.pathname = jsonPath;
      return context.rewrite(url.pathname);
    }
  }

  // 3. Fall through to default handling
  return context.next();
};