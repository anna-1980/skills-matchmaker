import styles from "./Input.module.scss";
import cn from "classnames";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import Label from "../label/Label";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  name: string;
  position?: "left" | "right";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  children,
  placeholder,
  type = "text",
  name,
  label,
  position = "left",
  className,
  onChange,
}) => {
  const iconClass = `input__control--icon-${
    position === "right" ? "right" : "left"
  }`;

  const inputControl = `${styles["input__control"]} ${
    children ? styles[iconClass] : ""
  }`;

  const inputClass = cn(styles.input, className);

  return (
    <div className={inputClass}>
      {label && (
        <Label label={label} className={styles.input__label} name={name} />
      )}
      <div className={styles.input__field}>
        {position === "left" && (
          <div className={styles["input__field--icon-left"]}>{children}</div>
        )}
        <input
          className={inputControl}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {position === "right" && (
          <div className={styles["input__field--icon-right"]}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
