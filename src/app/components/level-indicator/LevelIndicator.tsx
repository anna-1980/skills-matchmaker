import IconsLibrary from "../icons/IconsLibrary";
import styles from "./LevelIndicator.module.scss";

const LevelIndicator = (props: { skillLevel: number; className?: string }) => {
  const iconSize = "14px";
  return (
    <div className={`${styles["star__container"]}`}>
      {props.skillLevel >= 1 ? (
        <IconsLibrary
          symbol="star-full"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      ) : (
        <IconsLibrary
          symbol="star-empty"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      )}
      {props.skillLevel >= 2 ? (
        <IconsLibrary
          symbol="star-full"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      ) : (
        <IconsLibrary
          symbol="star-empty"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      )}

      {props.skillLevel >= 3 ? (
        <IconsLibrary
          symbol="star-full"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      ) : (
        <IconsLibrary
          symbol="star-empty"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      )}

      {props.skillLevel >= 4 ? (
        <IconsLibrary
          symbol="star-full"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      ) : (
        <IconsLibrary
          symbol="star-empty"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      )}
      {props.skillLevel >= 5 ? (
        <IconsLibrary
          symbol="star-full"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      ) : (
        <IconsLibrary
          symbol="star-empty"
          size={iconSize}
          fill="var(--color-secondary-dark)"
        />
      )}
    </div>
  );
};

export default LevelIndicator;
