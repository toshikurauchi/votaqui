import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [value, internalSetValue] = useState<string | null>();

  useEffect(() => {
    internalSetValue(localStorage.getItem(key));
  }, [key]);

  const setValue = useCallback(
    (username) => {
      localStorage.setItem(key, username);
      internalSetValue(username);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    internalSetValue(null);
  }, [key]);

  return {
    value,
    setValue,
    removeValue,
  };
}
