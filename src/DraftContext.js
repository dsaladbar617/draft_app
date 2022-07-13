import React, { useState } from "react";

const DraftContext = React.createContext('')

const DraftProvider = ({ children }) => {
  const [draft, setDraft] = useState([]);
  const [draftYear, setDraftYear] = useState(2022);
  const [teamId, setTeamId] = useState(0);
  const [filteredDraft, setFilteredDraft] = useState([]);

  const values = {
    draft,
    draftYear,
    teamId,
    filteredDraft
  }

  const setters = {
    setDraft,
    setDraftYear,
    setTeamId,
    setFilteredDraft
  }

  return (
    <DraftContext.Provider value={{values, setters}}>
      {children}
    </DraftContext.Provider>
  );
};

export { DraftContext, DraftProvider };