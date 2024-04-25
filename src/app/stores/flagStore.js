import { set } from "react-hook-form";
import { create } from "zustand";

const useFlagStore = create((set) => ({
  key: "VE",
  label: "Venezuela",
  placeholder: "4241234567",
  code: "58",
  regex: /^(4[1246]\d{8})$/,
  length: 10,
  setFlag: (flag) =>
    set((state) => ({
      key: flag.key,
      label: flag.label,
      placeholder: flag.placeholder,
      code: flag.code,
      regex: flag.regex,
      length: flag.length,
    })),
}));

export { useFlagStore };
