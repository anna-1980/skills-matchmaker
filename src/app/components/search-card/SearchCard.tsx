"use client";

import React, { useState } from "react";
import SearchCardBody from "./search-card-body/SearchCardBody";
import SearchCardHeader from "./search-card-header/SearchCardHeader";
import styles from "./SearchCard.module.scss";

export interface SearchCardProps {
  skillName: string;
  skillLevel: number;
  comment: string;
  lastUsed: string;
  userName: string;
  userTitle: string;
  userPFP: string;
}

const SearchCard = ({
  skillName,
  skillLevel,
  comment,
  lastUsed,
  userName,
  userTitle,
  userPFP,
}: SearchCardProps) => {
  const [toggleCard, setToggleCard] = useState<boolean>(false);
  return (
    <div
      className={
        toggleCard
          ? `${styles["searchCard"]} ${styles["searchCard--opened"]}`
          : `${styles["searchCard"]}`
      }
    >
      <SearchCardHeader
        toggleCard={toggleCard}
        setToggleCard={setToggleCard}
        skillName={skillName}
        skillLevel={skillLevel}
        userName={userName}
        userTitle={userTitle}
        userPFP={userPFP}
      />
      {toggleCard && <SearchCardBody comment={comment} lastUsed={lastUsed} />}
    </div>
  );
};

export default SearchCard;
