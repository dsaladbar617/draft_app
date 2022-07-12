import React, { useContext, useEffect } from "react";
import { DraftContext } from "../DraftContext";
// import { useLocation } from "react-router-dom";

const Table = () => {
  // const location = useLocation();
  let { values, setters } = useContext(DraftContext);

  // console.log(values.draft);


  // useEffect(() => {
  //   fetch(`https://statsapi.web.nhl.com/api/v1/draft/${values.draftYear}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setters.setDraft(data.drafts[0].rounds);
  //     });
  // }, []);

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
            // console.log(pick);

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
