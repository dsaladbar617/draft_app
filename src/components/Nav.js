import React, { useContext, useState } from "react";
import { DraftContext } from "../DraftContext";
import { useNavigate } from 'react-router-dom';

const Nav = () => {


  let { draft, setDraft } = useContext(DraftContext);
  const [val, setVal] = useState('');
  const nav = useNavigate();

  const handleUserInput = (e) => {
    setVal(e.target.value);
    setDraft(e.target.value)
  };
  const resetInputField = () => {
    nav(`/draft/${draft}`);
    setVal("");
  };

  return (
    <form>
      <input className='searchbar' data-testid='searchInput' value={val} placeholder='Search' onChange={handleUserInput}/>
      <button onClick={resetInputField}>Submit</button>
    </form>
  );
}

export default Nav;