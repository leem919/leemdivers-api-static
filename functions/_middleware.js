export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // --- 1. Handle /api/Account/Login POST requests ---
  if (
    pathname === "/api/Account/Login" &&
    context.request.method === "POST"
  ) {
    const data = await context.request.json();
    // Your login logic here. Example placeholder:
    return new Response(
      JSON.stringify({ received: true, yourData: data }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // --- 2. Redirect extensionless requests to .json ---
  // Don't redirect if:
  // - The path ends with .json
  // - The path ends with /
  // - The path looks like it already has a file extension
  if (
    !pathname.endsWith(".json") &&
    !pathname.endsWith("/") &&
    !pathname.match(/\.[a-zA-Z0-9]+$/) &&
    !pathname.startsWith("/api/")
  ) {
    url.pathname = pathname + ".json";
    return Response.redirect(url.toString(), 302);
  }

  // --- 3. Default: pass through ---
  return context.next();
}