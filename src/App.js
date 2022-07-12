import React, { useEffect, useState } from "react";
import Table from "./_components/Table";
import { DraftContext, DraftProvider } from "./DraftContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './_components/Nav';
import HomePage from './_components/HomePage';

function App() {
  // let { draft, setDraft } = DraftContext;

  return (
    <>
      <DraftProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={ <HomePage />} />
            <Route path='draft/:year' element={<Table />} />
          </Routes>
        </Router>
        <Table />
      </DraftProvider>
    </>
  );
}

export default App;
