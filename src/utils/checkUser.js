import callWebhook from "./callWebhook";

export default async function checkUser(payload) {
  console.log("checking user");
  try {
    const response = await callWebhook(
      process.env.NEXT_PUBLIC_URL_CHECK,
      payload
    );
    console.log(response.data.isRegistered);

    if (response.data.isRegistered) {
      console.log("registered");
      return {
        ok: true,
        userExists: true,
        errors: "El usuario ya se encuentra registrado",
      };
    }
    console.log("not registered");
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
