import React, { useContext, useEffect, useState } from "react";
import { DraftContext } from "../DraftContext";
import "../_styles/Table.css";
import Modal from "./Modal";

const Table = () => {
  let { values, setters } = useContext(DraftContext);
  let currentRound = 1;
  let currentTeamId = values.teamId;
  let filteredDraft = [];
  const [isOpen, setIsOpen] = useState(false);
  let content;

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

  useEffect(() => {
    if (values.currentProspectId) {
      fetch(`https://statsapi.web.nhl.com/api/v1/draft/prospects/${values.currentProspectId}`)
        .then(res => res.json())
        .then(data => {
          let playerId = data.prospects[0].nhlPlayerId
          setters.setCurrentPlayer(data.prospects[0].fullName)
          fetch(`https://statsapi.web.nhl.com//api/v1/people/${playerId}/stats?stats=careerRegularSeason`)
            .then(res => res.json())
            .then(data => {
              console.log(data.stats[0])
              if (data.stats[0].splits[0]) {
                setters.setPlayerStats(data.stats[0].splits[0].stat)
              } else {
                console.log('No NHL Stats')
              }
            })
        })
    }

  }, [ values.currentProspectId ])


  const checkPlayer = (id) => {
    setters.setPlayerStats({})
    setters.setCurrentProspectId(id);

    // if (Object.keys(values.playerStats).length !== 0 ) {
    //   content =
    //   <>
    //     <h4>{`Goals: ${values.playerStats.goals}`}</h4>
    //     <h4>{`Assists: ${values.playerStats.assists}`}</h4>
    //     <h4>{`Total Games: ${values.playerStats.games}`}</h4>
    //     <h4>{`+/-: ${values.playerStats.plusMinus}`}</h4>
    //     <h4>{`TOI/G: ${values.playerStats.timeOnIcePerGame}`}</h4>
    //   </>
    // } else {
    //   content = <h4>{`No NHL Player Data`}</h4>
    // }
    setIsOpen(true)
  }

  if (values.filteredDraft.length === 0) {
    return (
      <>
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
                    <tr key={`data${index}${pickIndex}`} onClick={() => {checkPlayer(pick.prospect.id)}} className="data">
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
                      <tr key={`data${index}${pickIndex}`} onClick={() => {checkPlayer(pick.prospect.id)}} className="data">
                        <td>{pick.round}</td>
                        <td>{pick.pickOverall}</td>
                        <td>{pick.team.name}</td>
                        <td >{pick.prospect.fullName}</td>
                      </tr>
                    </>
                  );
                }
              });
            })}
          </tbody>
        </table>
        {isOpen && <Modal setIsOpen={setIsOpen} content={content} />}
      </>
    );
  } else {
    return (
      <>
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
                <tr key={index} onClick={() => {checkPlayer(pick.prospect.id)}} className='data' >
                  <td>{pick.round}</td>
                  <td>{pick.pickOverall}</td>
                  <td>{pick.team.name}</td>
                  <td>{pick.prospect.fullName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpen && <Modal setIsOpen={setIsOpen} content={content} />}
      </>
    );
  }
};

export default Table;
