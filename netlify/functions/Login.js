// functions/account-login.js

exports.handler = async (event, context) => {
  // Only allow POST; return 405 for everything else
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Allow": "POST", "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Ignore event.body entirely and always return success
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "success" }),
  };
};
