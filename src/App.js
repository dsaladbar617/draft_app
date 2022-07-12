import React from "react";
import Table from "./_components/Table";
import { DraftProvider } from "./DraftContext";
import Nav from './_components/Nav';

function App() {
  // let { draft, setDraft } = DraftContext;

  return (
    <>
      <DraftProvider>
        <Nav />
        <Table />
      </DraftProvider>
    </>
  );
}

export default App;
