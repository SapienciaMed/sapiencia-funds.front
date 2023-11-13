import { useEffect, useState } from "react";

export default function useControlInfo() {
  const [info, setInfo] = useState([
    {
      value: 901,
      name: "Consolidados",
    },
    {
      value: 902,
      name: "Estratos 123",
    },
    {
      value: 903,
      name: "Estratos 456",
    },
  ]);
  return { info };
}
