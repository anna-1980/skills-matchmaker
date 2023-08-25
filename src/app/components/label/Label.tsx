import styles from "./Label.module.scss";
import { DetailedHTMLProps, FC, LabelHTMLAttributes } from "react";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  label: string;
  name: string;
}

const Label: FC<LabelProps> = ({ name, label }) => {
  return (
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
  );
};
export default Label;
