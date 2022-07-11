import React, { useState } from "react";

const DraftContext = React.createContext('')

const DraftProvider = ({ children }) => {
  const [draft, setDraft] = useState()

  const values = {
    draft
  }

  const setters = {
    setDraft
  }

  return (
    <DraftContext.Provider value={{values, setters}}>
      {children}
    </DraftContext.Provider>
  );
};

export { DraftContext, DraftProvider };