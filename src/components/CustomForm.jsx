"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "./PhoneInput";
import { useFlagStore } from "@/app/stores/flagStore";
// import enrollProcess from "../utils/enrollProcess";
// import useUserSubscription from "@/hooks/useUserSuscription";
import CustomSpinner from "./spinner";
import checkUser from "@/utils/checkUser";
import enrollUser from "@/utils/enrollUser";
import addUser from "@/utils/addUser";
export default function CustomForm() {
  const [termsAccepted, setTermsAccepted] = useState("true");
  const flag = useFlagStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setEnrollError("");
    data.phone = `${flag.code}${data.phone}`;
    const payload = {
      customerData: {
        Nombre: data.name,
        "Número telefónico": data.phone,
        "Correo electrónico": data.email,
      },
    };
    const check = await checkUser(payload);
    if (check.userExists || !check.ok) {
      setIsLoading(false);
      setEnrollError(check.errors);
      return;
    }

    //TODO: hay que agregar errores por si ocurren en el enroll y agregar la redireccion
    const enroll = await enrollUser(payload);
    console.log(enroll);
    if (!enroll.ok) {
      setIsLoading(false);
      setEnrollError(enroll.errors);
      return;
    }

    console.log({ enroll });
    //Take the user to the card website if the registration finished successfully

    const add = await addUser({
      ...payload,
      pid: enroll.pid,
      cardLink: enroll.url,
    });
    const cardURL = `https://q.passkit.net/~/#/p/${enroll.pid}`;
    window.location.replace(cardURL);
  };

  return (
    <div className=" w-4/5 md:w-2/5 mx-auto">
      {enrollError && <p className="text-red-500">{enrollError}</p>}
      <form
        action=""
        id="user-form"
        className="needs-validation"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-5 ">
          <label
            className="form-label block mb-2 text-md font-medium text-gray-900 dark:text-black text-left"
            htmlFor="nombre"
          >
            Nombre y apellido:
          </label>
          <input
            className=" form-input border-2 rounded-md py-1 px-2 w-full"
            {...register("name", {
              required: {
                value: true,
                message: "Por favor ingresa tu nombre y apellido.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede tener más de 50 caracteres.",
              },
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres.",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "El nombre solo puede contener letras.",
              },
            })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div className="my-5 d-flex flex-column">
          <label
            className="form-label block mb-2 text-md font-medium text-gray-900 dark:text-black text-left"
            htmlFor="numero"
          >
            Número telefónico:
          </label>
          <div className="flex flex-row form-input form-control border-2 rounded-md">
            <PhoneInput />
            <input
              placeholder={flag.placeholder}
              className="pl-2  w-full py-1 px-2"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Por favor ingresa tu número telefónico.",
                },
                maxLength: {
                  value: parseInt(flag.length),
                  message: "El número excede el largo permitido.",
                },
                minLength: {
                  value: parseInt(flag.length),
                  message: "El número debe contener 11 caracteres.",
                },
                pattern: {
                  value: flag.regex,
                  message: "El número ingresado no es válido.",
                },
              })}
            />
          </div>

          {errors.phone && (
            <p className="text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div className="my-5">
          <label
            className="form-label block mb-2 text-md font-medium text-gray-900 dark:text-black text-left"
            htmlFor="correo"
          >
            Correo electrónico:
          </label>
          <input
            className=" form-input form-control rounded-md border-2 w-full py-1 px-2"
            {...register("email", {
              required: {
                value: true,
                message: "Por favor ingresa tu correo electrónico.",
              },
              maxLength: {
                value: 50,
                message: "El correo no puede tener más de 50 caracteres.",
              },
              minLength: {
                value: 2,
                message: "El correo debe tener al menos 2 caracteres.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "El correo ingresado no es válido.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3 form-check">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms-check"
              value="aggree"
              defaultChecked
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label
              className="block ml-2 text-left lg:text-md font-medium text-gray-900 "
              htmlFor="terms-check"
            >
              Estoy de acuerdo con los términos y condiciones.
            </label>
          </div>
        </div>

        <div id="registered-container" className="text-red-600 mb-2"></div>

        <button
          id="submit-btn"
          className="bg-secondary text-white my-4 btn btn-primary px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex flex-row items-center justify-center"
          type="submit"
          disabled={!termsAccepted || isLoading}
        >
          {isLoading && <CustomSpinner />}
          Enviar
        </button>
      </form>
    </div>
  );
}
