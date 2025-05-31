// netlify/functions/api/Account/Login.js

export const handler = async (event, context) => {
  // We should still check if the method is POST, as per best practice for an API endpoint.
  // You could remove this if you truly want any method to return success,
  // but it's generally good to be specific.
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ message: 'Method Not Allowed. Please use POST.' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // Regardless of the input in event.body, return a success status.
  return {
    statusCode: 200, // OK
    body: JSON.stringify({ status: 'success' }),
    headers: {
      'Content-Type': 'application/json', // Good practice to set the content type
    },
  };
};