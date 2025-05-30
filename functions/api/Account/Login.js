export async function onRequest(context) {
  if (context.request.method === "POST") {
    // Parse incoming JSON body (if your POST sends JSON)
    const data = await context.request.json();
    // Do something with the data!
    return new Response(
      JSON.stringify({ received: true, yourData: data }),
      { headers: { "Content-Type": "application/json" } }
    );
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}