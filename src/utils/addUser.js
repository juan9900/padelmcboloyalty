import callWebhook from "./callWebhook";

export default function addUser(payload) {
  console.log("adding user");
  try {
    fetch(process.env.NEXT_PUBLIC_URL_ADD, {
      method: "POST",
      headers: {
        // Add CORS headers to allow requests from any origin
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.log("error in adding registered");
    return {
      ok: false,
      errors: e,
    };
  }
}
