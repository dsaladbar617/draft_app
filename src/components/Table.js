import React, { useContext, useEffect } from "react";
import { DraftContext } from "../DraftContext";
import { useLocation } from "react-router-dom";

const Table = () => {
  const location = useLocation();
  let { draft, setDraft } = useContext(DraftContext);

  console.log(draft)

  useEffect(() => {
    if (draft !== '') {
      fetch(`https://statsapi.web.nhl.com/api/v1/draft/${draft}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDraft(data.drafts[0].rounds)
        });
    }
  }, [ location ]);


  return (
    <table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Overall</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {draft.map((draft, roundIndex) => {
          return draft.picks.map((pick, pickIndex) => {
            console.log(pick)

            return (
              <tr key={pickIndex}>
                <td>{pick.round}</td>
                <td>{pick.pickOverall}</td>
                <td>{pick.prospect.fullName}</td>
              </tr>
            )
          }
          );

          // return (
          //   <tr key={index}>{draft.picks}</tr>
          // )
        })}
      </tbody>
      </table>
  );
}

export default Table;