"use client";
import React from "react";
import LastUsed from "../../last-used/LastUsed";
import Select from "../../select/Select";
import Textarea from "../../textarea/Textarea";
import styles from "./CardBody.module.scss";
import cn from "classnames";

const skillLevel = [
  { id: 1, name: "Very Basic" },
  { id: 2, name: "Basic" },
  { id: 3, name: "Intermediate" },
  { id: 4, name: "Advanced" },
  { id: 5, name: "Ninja" },
];

interface CardBodyProps {
  edit: boolean;
  lastUsed: string | undefined;
  usedDaily: boolean | undefined;
  comment: string;
  className?: string;
}

const CardBody = ({
  edit,
  lastUsed,
  usedDaily,
  comment,
  className,
}: CardBodyProps) => {
  return (
    <div
      className={cn(
        styles["card-body"],
        edit ? styles["card-body--edit"] : "",
        className
      )}
    >
      {edit ? (
        <div className={styles["card-body__skill-level"]}>
          <Select
            label="Skill level"
            name="SkillLevel"
            placeholder="Year"
            options={skillLevel}
          />
        </div>
      ) : null}
      {edit ? (
        <div className={`${styles["card-body__date-edit"]}`}>
          <LastUsed onChange={(e: any): void => {}}></LastUsed>
        </div>
      ) : (
        <p className={`${styles["card-body__last-used"]}`}>
          Last used: {usedDaily ? "Used dalily" : lastUsed}
        </p>
      )}
      {!edit ? (
        <p className={`${styles["card-body__comment"]}`}>{comment}</p>
      ) : (
        <Textarea
          label="Comment"
          name="comment"
          placeholder={comment}
          onChange={() => {}}
          className={styles["card-body__textarea"]}
        ></Textarea>
      )}
    </div>
  );
};

export default CardBody;
