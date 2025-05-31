exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "success" }),
    headers: {
      "Content-Type": "application/json"
    }
  };
};