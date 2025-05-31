export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // 1. Handle only the specific API POST route
  if (
    pathname === "/api/Account/Login" &&
    context.request.method === "POST"
  ) {
    const data = await context.request.json();
    // Put your login/authentication logic here
    return new Response(
      JSON.stringify({ received: true, yourData: data }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Redirect extensionless, non-API paths to .json
  // Conditions:
  // - Not an /api path
  // - Not ending with /
  // - Not ending with .json
  // - Not ending with any other file extension
  if (
    !pathname.startsWith("/api/") &&
    !pathname.endsWith("/") &&
    !pathname.endsWith(".json") &&
    !pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    url.pathname = `${pathname}.json`;
    return Response.redirect(url.toString(), 302);
  }

  // 3. Pass through everything else
  return context.next();
}