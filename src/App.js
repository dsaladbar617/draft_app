import React, { useState } from "react";
import Table from "./_components/Table";
import { DraftProvider } from "./DraftContext";
import Nav from "./_components/Nav";
import styles from './App.css';
import Modal from "./_components/Modal";
import NewTable from "./_components/NewTable";

function App() {
  // let { draft, setDraft } = DraftContext;
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <DraftProvider>
        <Nav />
        <Table />
      </DraftProvider> */}
      <DraftProvider>
        <Nav />
        <NewTable />
      </DraftProvider>
      

    </>
  );
}

export default App;
