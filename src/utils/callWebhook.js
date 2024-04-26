export default async function callWebhook(url, payload = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Add CORS headers to allow requests from any origin
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return { data, ok: response.ok };
  } catch (e) {
    console.log({ webhook: e });
    return false;
  }
}
