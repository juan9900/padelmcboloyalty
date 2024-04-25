"use client";
import CustomForm from "@/components/CustomForm";
import Navbar from "@/components/Navbar";
import PhoneInput from "@/components/PhoneInput";
import { useGetCardData } from "@/hooks/useGetCardData";

export default function Home() {
  const { cardData, isLoading } = useGetCardData();
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <main className="text-center">
      <Navbar />
      <h1 className=" text-[2em] lg:text-[2.5em] font-bold text-gray-800 text-center mt-10">
        {cardData.business}
      </h1>

      <h2 className="text-[1.5em] lg:w-full w-4/5 mx-auto lg:text-[1.9em] font-bold text-gray-600 mb-10">
        {cardData.description}
      </h2>

      <CustomForm />
      <h2 className="text-[1.5em] lg:mt-0 mt-10 lg:text-[2em] lg:w-full w-4/5 mx-auto font-bold text-gray-800 text-center">
        Términos y condiciones
      </h2>
      <ul className="text-left w-4/5 lg:w-2/5 mx-auto text-lg mb-12">
        {cardData.terms.split("\n").map((term, index) => (
          <li className="my-2" key={`term-${index}`}>
            {term}
          </li>
        ))}
      </ul>
    </main>
  );
}
