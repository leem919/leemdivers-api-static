export default async (request, context) => {
  const url = new URL(request.url);

  // 1. Respond to POST /api/Account/Login
  if (
    url.pathname === "/api/Account/Login" &&
    request.method === "POST"
  ) {
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }

  // 2. Redirect all other requests (except those ending in .json or /api/Account/Login) to .json
  if (
    !url.pathname.endsWith(".json") &&
    url.pathname !== "/api/Account/Login"
  ) {
    url.pathname = url.pathname + ".json";
    return Response.redirect(url.toString(), 301);
  }

  // Otherwise, continue to next handler or asset
  return context.next();
};