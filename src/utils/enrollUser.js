import generateJWT from "./generateJWT";

export default async function enrollUser(payload) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ENROLL}${process.env.NEXT_PUBLIC_URL_PROGRAM}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: generateJWT(
            process.env.NEXT_PUBLIC_LL_API_KEY,
            process.env.NEXT_PUBLIC_LL_API_SECRET,
            process.env.NEXT_PUBLIC_LL_USERNAME
          ),
        },
        body: JSON.stringify(payload),
      }
    );
    const parsedResponse = await response.json();

    if (parsedResponse.error?.includes("is not valid")) {
      return {
        ...parsedResponse,
        ok: false,
        errors: "El correo electrónico ingresado no es válido.",
      };
    }
    return { ...parsedResponse, ok: true };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      errors: e,
    };
  }
}
