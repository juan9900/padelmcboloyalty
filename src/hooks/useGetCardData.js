import generateJWT from "@/utils/generateJWT";
import { useState, useEffect } from "react";

export function useGetCardData() {
  const [cardData, setCardData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCardData = async () => {
      const jwt = generateJWT(
        process.env.NEXT_PUBLIC_LL_API_KEY,
        process.env.NEXT_PUBLIC_LL_API_SECRET,
        process.env.NEXT_PUBLIC_LL_USERNAME
      );
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TERMS_URL}${process.env.NEXT_PUBLIC_URL_PROGRAM}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: jwt,
            },
          }
        );
        const data = await response.json();
        setCardData({
          business: data.business.name,
          collectValue: data.collectValue,
          description: data.description,
          terms: data.terms,
        });
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    getCardData();
  }, []);

  return {
    cardData,
    isLoading,
  };
}
