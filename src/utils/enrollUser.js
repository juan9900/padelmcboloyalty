import generateJWT from "./generateJWT";

export default async function enrollUser(payload) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ENROLL}${process.env.NEXT_PUBLIC_URL_PROGRAM}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: generateJWT(
          //   process.env.NEXT_PUBLIC_LL_API_KEY,
          //   process.env.NEXT_PUBLIC_LL_API_SECRET,
          //   process.env.NEXT_PUBLIC_LL_USERNAME
          // ),
        },
        body: JSON.stringify(payload),
      }
    );
    const parsedResponse = await response.json();

    if (parsedResponse.error) {
      let error;
      if (parsedResponse.includes("is not valid")) {
        error = "El correo electrónico ingresado no es válido.";
      } else {
        error = "Error al registrar usuario, por favor inténtalo de nuevo.";
      }
      return {
        ...parsedResponse,
        ok: false,
        errors: error,
      };
    }
    return { ...parsedResponse, ok: true };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      errors: "Error al registrar usuario, por favor inténtalo de nuevo.",
    };
  }
}
