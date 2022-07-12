import React, { useContext } from "react";
import { DraftContext } from "../DraftContext";
import '../_styles/Table.css';

const Table = () => {
  let { values } = useContext(DraftContext);

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
        {values.draft.map((draft) => {
          return draft.picks.map((pick, pickIndex) => {
            return (
              <tr key={pickIndex}>
                <td>{pick.round}</td>
                <td>{pick.pickOverall}</td>
                <td>{pick.team.name}</td>
                <td>{pick.prospect.fullName}</td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default Table;
