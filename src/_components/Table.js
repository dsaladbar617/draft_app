import React, { useContext, useEffect } from "react";
import { DraftContext } from "../DraftContext";
import "../_styles/Table.css";

const Table = () => {
  let { values, setters } = useContext(DraftContext);
  let currentRound = 1;
  let currentTeamId = values.teamId;
  let filteredDraft = [];

  useEffect(() => {
    values.draft.forEach((draft) => {
      draft.picks.forEach((pick) => {
        if (parseInt(pick.team.id) === currentTeamId) {
          filteredDraft.push(pick);
        }
      });
    });

    setters.setFilteredDraft(filteredDraft);
  }, [currentTeamId, values.draft]);

  if (values.filteredDraft.length === 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Overall</th>
            <th>Team</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {values.draft.map((draft, index) => {
            return draft.picks.map((pick, pickIndex) => {
              if (parseInt(pick.round) === currentRound) {

                return (
                  <tr key={`data${index}${pickIndex}`} className="data">
                    <td>{pick.round}</td>
                    <td>{pick.pickOverall}</td>
                    <td>{pick.team.name}</td>
                    <td>{pick.prospect.fullName}</td>
                  </tr>
                );
              } else {
                currentRound++;
                return (
                  <>
                    <tr key={`space${index}${pickIndex}`} className="space">
                      <td colSpan={4}>{`Round ${pick.round}`}</td>
                    </tr>
                    <tr key={`data${index}${pickIndex}`} className="data">
                      <td>{pick.round}</td>
                      <td>{pick.pickOverall}</td>
                      <td>{pick.team.name}</td>
                      <td>{pick.prospect.fullName}</td>
                    </tr>
                  </>
                );
              }
            });
          })}
        </tbody>
      </table>
    );
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Overall</th>
            <th>Team</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {values.filteredDraft.map((pick, index) => {
            return (
              <tr key={index} className='data' >
                <td>{pick.round}</td>
                <td>{pick.pickOverall}</td>
                <td>{pick.team.name}</td>
                <td>{pick.prospect.fullName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};

export default Table;
