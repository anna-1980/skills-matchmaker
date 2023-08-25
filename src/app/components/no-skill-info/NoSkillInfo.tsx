import React from "react";
import styles from "./NoSkillInfo.module.scss";
import Image from "next/image";

const NoSkillInfo = () => {
  return (
    <div className={styles["no-skill"]}>
      <Image
        className={styles["no-skill__clipart"]}
        src="./no-skill-icon.svg"
        alt="You have no skills added info"
        width={100}
        height={100}
      />
      <p className={styles["no-skill__txt"]}>
        You have not added any skill yet!
      </p>
    </div>
  );
};

export default NoSkillInfo;
