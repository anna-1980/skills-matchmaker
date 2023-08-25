import styles from "./Card.module.scss";
import { useState } from "react";
import CardHeader from "./card-header/CardHeader";
import CardBody from "./card-body/CardBody";
import CardFooter from "./card-footer/CardFooter";
import cn from "classnames";

interface CardProps {
  skillName: string;
  skillLevel: number;
  lastUsed: string | undefined;
  usedDaily: boolean | undefined;
  comment: string;
}

const Card = ({
  skillName,
  skillLevel,
  lastUsed,
  usedDaily,
  comment,
}: CardProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [isCardClosed, setToggleCard] = useState<boolean>(true);

  return (
    <div
      className={cn(
        styles.card,
        !isCardClosed ? styles["card--opened"] : "",
        edit ? styles["card--edit"] : ""
      )}
    >
      <CardHeader
        toggleCard={isCardClosed}
        setToggleCard={setToggleCard}
        skillName={skillName}
        skillLevel={skillLevel}
        edit={edit}
        className={styles.card__header}
      />
      <CardBody
        comment={comment}
        edit={edit}
        lastUsed={lastUsed}
        usedDaily={usedDaily}
        className={styles.card__body}
      />
      <CardFooter
        edit={edit}
        setEdit={setEdit}
        className={styles.card__footer}
      />
    </div>
  );
};

export default Card;
