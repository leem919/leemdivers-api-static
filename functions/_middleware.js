export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Respond "success" for POST /api/Account/Login
  if (
    url.pathname === "/api/Account/Login" &&
    request.method.toUpperCase() === "POST"
  ) {
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Redirect all other requests (except those ending in .json or /api/Account/Login) to .json endpoint
  if (
    !url.pathname.endsWith(".json") &&
    url.pathname !== "/api/Account/Login"
  ) {
    url.pathname = url.pathname + ".json";
    return Response.redirect(url.toString(), 301);
  }

  // Otherwise, continue to next handler
  return next();
}