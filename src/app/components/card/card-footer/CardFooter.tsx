import cn from "classnames";
import { useRouter } from "next/navigation";
import Button from "../../button/Button";
import IconsLibrary from "../../icons/IconsLibrary";
import styles from "./CardFooter.module.scss";

interface CardFooterProps {
  edit: boolean;
  setEdit: (value: boolean) => void;
  toggleCard?: boolean;
  className?: string;
  skill_id: string;
}

const CardFooter = ({
  edit,
  setEdit,
  className,
  skill_id,
}: CardFooterProps) => {
  const router = useRouter();
  const handleEdit = () => {
    setEdit(!edit);
  };

  const onDelete = (skill_id: string) => {
    const skillId = skill_id;
    fetch("/api/skills", {
      method: "PATCH",
      body: JSON.stringify(skillId),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    router.refresh();
  };

  return (
    <div className={cn(styles["card-footer"], className)}>
      <div
        className={
          edit
            ? `${styles["card-footer__buttons--delete"]}`
            : `${styles["card-footer__buttons--show"]}`
        }
      >
        <Button
          priority="tertiary"
          size="icon"
          onClick={() => {
            onDelete(skill_id);
          }}
        >
          <IconsLibrary symbol="delete" size="26px" fill="$color-primary" />
        </Button>
      </div>
      <div className={`${styles["card-footer__buttons"]}`}>
        {edit && (
          <div className={`${styles["card-footer__buttons--cancel"]}`}>
            <Button
              priority="tertiary"
              size="icon"
              onClick={() => {
                handleEdit();
              }}
            >
              <IconsLibrary symbol="cancel" size="26px" fill="$color-primary" />
            </Button>
          </div>
        )}
        <div className={`${styles["card-footer__buttons--check"]}`}>
          <Button
            priority="accent"
            size="icon"
            onClick={() => {
              handleEdit();
            }}
          >
            <IconsLibrary
              symbol={edit ? "tickmark" : "edit"}
              size="26px"
              fill="$color-primary"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
