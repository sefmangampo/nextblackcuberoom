import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const userAppContext = () => {
  return useContext(AppContex);
};

export function ContextWrapper({ children }) {
  const [quotes, setQuotes] = useState(null);

  const quotesContext = {
    quotes,
    setQuotes,
  };

  return (
    <AppContext.Provider value={quotesContext}>{children}</AppContext.Provider>
  );
}
