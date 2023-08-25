import cn from "classnames";
import Button from "../../button/Button";
import IconsLibrary from "../../icons/IconsLibrary";
import styles from "./CardFooter.module.scss";

interface CardFooterProps {
  edit: boolean;
  setEdit: (value: boolean) => void;
  toggleCard?: boolean;
  className?: string;
}

const CardFooter = ({ edit, setEdit, className }: CardFooterProps) => {
  const handleEdit = () => {
    setEdit(!edit);
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
          iconR={
            <IconsLibrary
              symbol="delete"
              size="26px"
              fill="var(--color-primary)"
            />
          }
        />
      </div>
      <div className={`${styles["card-footer__buttons"]}`}>
        {edit && (
          <div className={`${styles["card-footer__buttons--cancel"]}`}>
            <Button
              priority="tertiary"
              size="icon"
              iconR={
                <IconsLibrary
                  symbol="cancel"
                  size="26px"
                  fill="var(--color-primary)"
                />
              }
              onClick={() => {
                handleEdit();
              }}
            />
          </div>
        )}
        <div className={`${styles["card-footer__buttons--check"]}`}>
          <Button
            priority="accent"
            size="icon"
            iconR={
              <IconsLibrary
                symbol={edit ? "tickmark" : "edit"}
                size="26px"
                fill="var(--color-primary)"
              />
            }
            onClick={() => {
              handleEdit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
