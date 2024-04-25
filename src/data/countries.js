const countries = [
  {
    key: "VE",
    label: "Venezuela",
    placeholder: "4241234567",
    code: "58",
    regex: /^(414|424|412|416|426)[0-9]{7}$/g,
    length: 10,
  },
  {
    key: "US",
    label: "Estados Unidos",
    placeholder: "6501234567",
    code: "1",
    regex: /^[0-9]{3}[0-9]{3}[0-9]{4}$/g,
    length: 10,
  },
  {
    key: "CO",
    label: "Colombia",
    placeholder: "3501234567",
    code: "57",
    regex: /^[0-9]{3}[0-9]{3}[0-9]{4}$/g,
    length: 10,
  },
  {
    key: "BR",
    label: "Brasil",
    placeholder: "11912345678",
    code: "55",
    regex: /^[0-9]{2}[0-9]{5}[0-9]{4}$/g,
    length: 11,
  },
];

export default countries;
