import callWebhook from "./callWebhook";

export default async function checkUser(payload) {
  try {
    const response = await callWebhook(
      process.env.NEXT_PUBLIC_URL_CHECK,
      payload
    );

    if (response.data.isRegistered) {
      return {
        ok: true,
        userExists: true,
        errors: "El usuario ya se encuentra registrado",
      };
    }
    return {
      ok: true,
      userExists: false,
      errors: "",
    };
  } catch (e) {
    console.log("error in checking registered");
    return {
      ok: false,
      errors: e,
    };
  }
}
