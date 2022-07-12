import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { DraftContext } from "../DraftContext";
import '../_styles/Nav.css';

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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid gray',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      width: 200
    }),
    a: {
      width: 200,
    },
    control: (provided) => ({
      ...provided,
      margin: "0px"

    }),
    menu: (styles) => ({
      ...styles,
      margin: "0px",
      width: 200,
    }),
    container: (styles) => ({
      ...styles,
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  return (
    <>
      <h1 className="title">Welcome to the {values.draftYear} NHL Draft</h1>
      <div className="select">
        <Select
          menuColor="slate"
          styles={customStyles}
          placeholder='Select Draft Year...'
          onChange={handleChange}
          options={options}
        />
      </div>
    </>
  );
}

export default Nav;