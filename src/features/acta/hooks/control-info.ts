import { useEffect, useState } from "react";

export default function useControlInfo() {
  const [info, setInfo] = useState([
    {
      value: 1,
      name: "Consolidados",
    },
    {
      value: 2,
      name: "Estratos 1,2,3",
    },
    {
      value: 3,
      name: "Estratos 4,5,6",
    },
    {
      value: 4,
      name: "Informe legalización",
    },
    {
      value: 5,
      name: "Pagaré",
    },
    {
      value: 6,
      name: "Control",
    },
  ]);
  return { info };
}
