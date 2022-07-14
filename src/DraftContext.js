import React, { useState } from "react";

const DraftContext = React.createContext('')

const DraftProvider = ({ children }) => {
  const [draft, setDraft] = useState([]);
  const [draftYear, setDraftYear] = useState(2022);
  const [teamId, setTeamId] = useState(0);
  const [filteredDraft, setFilteredDraft] = useState([]);
  const [currentProspectId, setCurrentProspectId] = useState(0);
  const [playerStats, setPlayerStats] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState('');

  const values = {
    draft,
    draftYear,
    teamId,
    filteredDraft,
    currentProspectId,
    playerStats,
    currentPlayer
  }

  const setters = {
    setDraft,
    setDraftYear,
    setTeamId,
    setFilteredDraft,
    setCurrentProspectId,
    setPlayerStats,
    setCurrentPlayer
  }

  return (
    <DraftContext.Provider value={{values, setters}}>
      {children}
    </DraftContext.Provider>
  );
};

export { DraftContext, DraftProvider };