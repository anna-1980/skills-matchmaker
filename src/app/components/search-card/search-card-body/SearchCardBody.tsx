"use client";
import React, { useState } from "react";
import Button from "../../button/Button";
import styles from "./SearchCardBody.module.scss";

interface SearchCardBodyProps {
  lastUsed: string;
  comment: string;
}

const SearchCardBody = ({ lastUsed, comment }: SearchCardBodyProps) => {
  return (
    <div className={styles["searchCardBody"]}>
      <p className={styles["searchCardBody__date"]}>Last used: {lastUsed} </p>
      <p className={styles["searchCardBody__comment"]}>{comment}</p>
      <Button className={styles["searchCardBody__button"]} priority="accent">
        View Full Profile
      </Button>
    </div>
  );
};

export default SearchCardBody;
