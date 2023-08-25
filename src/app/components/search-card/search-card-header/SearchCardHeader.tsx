import Button from "../../button/Button";
import IconsLibrary from "../../icons/IconsLibrary";
import LevelIndicator from "../../level-indicator/LevelIndicator";
import UserAvatar from "../../user-avatar/UserAvatar";
import styles from "./SearchCardHeader.module.scss";

interface SearchCardHeaderProps {
  toggleCard: boolean;
  setToggleCard: (value: boolean) => void;
  skillLevel: number;
  skillName: string;
  userName: string;
  userTitle: string;
  userPFP: string;
}

const SearchCardHeader = ({
  toggleCard,
  setToggleCard,
  skillLevel,
  skillName,
  userName,
  userTitle,
  userPFP,
}: SearchCardHeaderProps) => {
  const handleToggle = (): void => {
    setToggleCard(!toggleCard);
  };

  return (
    <div className={styles["searchCardHeader"]}>
      <div className={styles["searchCardHeader__container"]}>
        <div className={styles["userDetails"]}>
          <div className={styles["userDetails__userAvatar"]}>
            <UserAvatar name={userName} />
          </div>
          <span className={styles["userDetails__name"]}>{userName}</span>
          <span className={styles["userDetails__title"]}>{userTitle}</span>
        </div>

        <div className={styles["skills"]}>
          <span className={styles["skills__skillName"]}>{skillName}</span>
          <div className={styles["skills__skillLevel"]}>
            <LevelIndicator skillLevel={skillLevel} />
          </div>
        </div>
      </div>

      <div className={styles["searchCardHeader__toggle"]}>
        <Button
          priority="transparent"
          size="icon"
          onClick={handleToggle}
          iconR={
            <IconsLibrary
              symbol={toggleCard ? "arr-up" : "arr-down"}
              size="26px"
              fill="var(--color-secondary-dark)"
            />
          }
        />
      </div>
    </div>
  );
};

export default SearchCardHeader;
