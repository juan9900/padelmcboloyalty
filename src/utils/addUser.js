import callWebhook from "./callWebhook";

export default async function addUser(payload) {
  try {
    const response = await callWebhook(
      process.env.NEXT_PUBLIC_URL_ADD,
      payload
    );
  } catch (e) {
    console.log("error in adding registered");
    return {
      ok: false,
      errors: e,
    };
  }
}
