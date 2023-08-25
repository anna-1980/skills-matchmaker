import styles from "./UserAvatar.module.scss";

interface UserAvatarProps {
  className?: string;
  name: string;
}

const UserAvatar = ({ className, name }: UserAvatarProps) => {
  const userNameFromDatabase = "Evan better Than ever marry";

  const userNameFirstLastInitial = (userNameFromDatabase: string) => {
    let nameSplitItems = userNameFromDatabase.split(" ");
    let initialsFirstLast = nameSplitItems[0].substring(0, 1).toUpperCase();
    if (nameSplitItems.length > 1) {
      initialsFirstLast += nameSplitItems[nameSplitItems.length - 1]
        .substring(0, 1)
        .toUpperCase();
      return initialsFirstLast;
    }
  };

  const displayUserInitialsFirstLastOnly =
    userNameFirstLastInitial(name);

  return (
    <div className={`${styles.avatar} ${className}`}>
      <p className={styles.avatar__initials}>
        {displayUserInitialsFirstLastOnly}
      </p>
    </div>
  );
};

export default UserAvatar;
