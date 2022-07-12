import React, { useState } from "react";

const DraftContext = React.createContext('')

const DraftProvider = ({ children }) => {
  const [draft, setDraft] = useState([]);
  const [draftYear, setDraftYear] = useState(2022);

  const values = {
    draft,
    draftYear
  }

  const setters = {
    setDraft,
    setDraftYear
  }

  return (
    <DraftContext.Provider value={{values, setters}}>
      {children}
    </DraftContext.Provider>
  );
};

export { DraftContext, DraftProvider };