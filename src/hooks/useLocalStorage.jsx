import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : initialValue;
  });

  const changeKey = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, changeKey];
};
