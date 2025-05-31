export default async (request, context) => {
  const url = new URL(request.url);

  // Handle /api/Account/Login POST
  if (url.pathname === '/api/Account/Login' && request.method === 'POST') {
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }

  // Rewrite /foo -> /foo.json (if /foo.json exists)
  if (
    !url.pathname.endsWith('.json') &&
    url.pathname !== '/api/Account/Login'
  ) {
    // Remove trailing slash for consistency
    let jsonPath = url.pathname.replace(/\/$/, "") + '.json';
    // HEAD request to check if the file exists
    const res = await context.fetch(jsonPath, { method: "HEAD" });
    if (res.ok) {
      // Rewrite to the .json file
      return context.rewrite(jsonPath);
    }
  }

  // Otherwise, continue as normal
  return context.next();
};