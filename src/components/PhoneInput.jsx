import { useState, useEffect, useRef } from "react";
import "intl-tel-input/build/css/intlTelInput.css";
import countries from "@/data/countries";
import { useFlagStore } from "@/app/stores/flagStore";
import Flag from "react-flagkit";

const phoneExamples = {
  ve: "04246023604",
  us: "2015550123",
  mx: "5512345678",
  co: "3211234567",
  ar: "1123456789",
  pe: "987654321",
  ec: "0991234567",
  cl: "987654321",
  br: "11988888888",
};

export default function PhoneInput() {
  // const [phoneValue, setPhoneValue] = useState({
  //   iso2: "ve",
  //   dialCode: "58",
  //   phone: "",
  // });
  // const [selectedCountry, setSelectedCountry] = useState(
  //   phoneExamples[phoneValue.iso2]
  // );
  // const inputProps = {
  //   placeholder: selectedCountry,
  // };

  // const intlTelOpts = {
  //   preferredCountries: ["ve", "us", "mx", "co", "ar", "pe", "ec", "cl", "br"],
  // };

  // const onChange = (value) => {
  //   setPhoneValue({ ...value });
  //   setSelectedCountry(phoneExamples[value.iso2]);
  // };
  // const onReady = (instance, IntlTelInput) =>
  //   console.log(instance, IntlTelInput);

  // return (
  //   <ReactIntlTelInput
  //     inputProps={inputProps}
  //     intlTelOpts={intlTelOpts}
  //     value={phoneValue}
  //     onChange={onChange}
  //     onReady={onReady}
  //     className="w-full py-1 px-2 border-2  rounded-md"
  //   />
  // );

  const flag = useFlagStore((state) => state);
  const setFlag = useFlagStore((state) => state.setFlag);
  const [selectedFlag, setSelectedFlag] = useState(countries[0]);
  const [showFlagList, setShowFlagList] = useState(false);
  const dropdownRef = useRef(null);

  const toggleFlagList = () => {
    setShowFlagList(!showFlagList);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFlagList(false);
      }
    };

    // Add event listener to detect clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      onClick={toggleFlagList}
      className="cursor-pointer pl-2 pr-2 relative flex flex-row items-center"
    >
      <Flag country={flag.key} className="mr-1" />
      <p className={``}>{flag.code}</p>
      {showFlagList && (
        <ul className="overflow-y-scroll max-h-[15rem] flex flex-col justify-center items-left absolute top-full left-0 bg-gray-100 w-[15rem] rounded-b-lg">
          {countries.map((country) => (
            <li
              key={country.key}
              className="py-2 flex flex-row items-center  w-full pl-2 "
              onClick={() => {
                setFlag({ ...country });
                toggleFlagList();
              }}
            >
              <Flag className="mr-2" key={country.key} country={country.key} />
              <p className="mr-1 text-black">{country.label}</p>
              <p className=" text-secondary font-bold">+{country.code}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
