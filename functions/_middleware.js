export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Only redirect if the path does NOT already end with .json and does NOT look like a directory
  if (!url.pathname.endsWith('.json') && !url.pathname.endsWith('/')) {
    // Optionally, exclude extensions (like .css, .js, etc.) if you only want to redirect extensionless paths
    if (!url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
      url.pathname = url.pathname + '.json';
      return Response.redirect(url.toString(), 302); // 302 = temporary; use 301 for permanent
    }
  }
  // Otherwise, continue as normal
  return context.next();
}