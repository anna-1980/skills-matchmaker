import styles from "./Checkbox.module.scss";
import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import cn from "classnames";

interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  children: React.ReactNode;
  className?: string;
  onChange?: any;
}
const Checkbox: FC<CheckboxProps> = ({
  name,
  children,
  className,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const currentCheckboxState = event.currentTarget.checked;
    setIsChecked(currentCheckboxState);
    onChange(event);
  };

  return (
    <label
      className={cn(
        styles.checkbox,
        isChecked ? styles["checkbox--checked"] : "",
        className
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        name={name}
        id={name}
        value={name ?? ""}
      />
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
