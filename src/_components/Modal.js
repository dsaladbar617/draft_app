import React, { useContext } from "react";
import styles from "../_styles/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { DraftContext } from "../DraftContext";

const Modal = ({ setIsOpen, content }) => {
  let { values, setters } = useContext(DraftContext);
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div classsName={styles.modalHeader}>
            <h2 className={styles.heading}>{`Name: ${values.currentPlayer}`}</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>

            {/* {content} */}

            <h4>{`Goals: ${values.playerStats.goals}`}</h4>
            <h4>{`Assists: ${values.playerStats.assists}`}</h4>
            <h4>{`Total Games: ${values.playerStats.games}`}</h4>
            <h4>{`+/-: ${values.playerStats.plusMinus}`}</h4>
            <h4>{`TOI/G: ${values.playerStats.timeOnIcePerGame}`}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
