import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { DraftContext } from "../DraftContext";
// import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const { values, setters } = useContext(DraftContext);
  let currentYear = new Date().getFullYear();
  let arr = [];
  for (let i = currentYear; i > 1962; i--) {
    arr.push(i);
  }
  let options = arr.map((item) => ({ value: item, label: item }))

  useEffect(() => {
    fetch(`https://statsapi.web.nhl.com/api/v1/draft/${values.draftYear}`)
      .then((res) => res.json())
      .then((data) => {
        setters.setDraft(data.drafts[0].rounds);
      })
  }, [ values.draftYear ]);

  let handleChange = (e) => {
    setters.setDraftYear(e.value)
  }

  return (
    <>
      <h1>Welcome to the {values.draftYear} NHL Draft</h1>
      <Select onChange={handleChange} options={options} />
    </>
  );
}

export default Nav;