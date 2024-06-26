import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useDarkMode = (initialValue) => {
  const [geceModu, setGeceModu] = useState(initialValue);

  const [value, changeKey] = useLocalStorage("geceModu", initialValue);

  const toggleTheme = () => {
    setGeceModu(!geceModu);
    changeKey(!geceModu);
  };

  useEffect(() => {
    changeKey(false);
  }, []);

  return [value, toggleTheme];
};
