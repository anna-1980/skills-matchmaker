import Button from "../../button/Button";
import IconsLibrary from "../../icons/IconsLibrary";
import LevelIndicator from "../../level-indicator/LevelIndicator";
import styles from "./CardHeader.module.scss";
import Select from "../../select/Select";
import cn from "classnames";

const skillLevelOption = [
  { value: 1, name: "Very Basic" },
  { value: 2, name: "Basic" },
  { value: 3, name: "Intermediate" },
  { value: 4, name: "Advanced" },
  { value: 5, name: "Expert" },
];

interface CardHeaderProps {
  toggleCard: boolean;
  setToggleCard: (value: boolean) => void;
  skillLevel: number;
  skillName: string;
  edit: boolean;
  className?: string;
}

const CardHeader = ({
  toggleCard,
  setToggleCard,
  skillLevel,
  edit,
  skillName,
  className,
}: CardHeaderProps) => {
  const handleToggle = (): void => {
    setToggleCard(!toggleCard);
  };

  return (
    <div className={cn(styles["card-header"], className)}>
      <p className={`${styles["card-header__skill"]}`}>{skillName}</p>
      <div className={`${styles["card-header__skills-level"]}`}>
        {edit ? (
          <div className={`${styles["card-header__level-select"]}`}>
            <Select
              name="month"
              label="Level"
              placeholder="Year"
              options={skillLevelOption}
            />
          </div>
        ) : null}
        <div className={`${styles["card-header__stars"]}`}>
          <LevelIndicator skillLevel={skillLevel} />
        </div>
      </div>
      <Button
        priority="transparent"
        size="icon"
        className={`${styles["card-header__toggle"]}`}
        onClick={handleToggle}
        iconR={
          <IconsLibrary
            symbol={toggleCard ? "arr-down" : "arr-up"}
            size="26px"
            fill="var(--color-secondary-dark)"
          />
        }
      />
    </div>
  );
};

export default CardHeader;
