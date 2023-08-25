import styles from "./Select.module.scss";
import IconsLibrary from "../icons/IconsLibrary";
import Label from "../label/Label";
import { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";
import cn from "classnames";

export interface Option {
  id?: number;
  name: string;
}
interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  label?: string;
  options: Option[];
  name: string;
  onChange?: any;
  loading?: boolean;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({
  name,
  label,
  options,
  onChange,
  loading = false,
  className,
  disabled,
}) => {
  // console.log(options.map((option) => (
            
  //           <option
  //             key={option.id ?? Math.random()}
  //             value={option ? option.id : 0}
  //           >
  //             {options ? option.name : "Loading..."}
  //           </option>

  //         ))) 
  return (
    
    <div
      className={cn(
        styles.select,
        disabled ? styles["select--disabled"] : "",
        className
      )}
    >
      {label && <Label label={label} name={name} />}
      <div className={styles.select__field}>
        <select
          className={styles.select__control}
          name={name}
          id={name}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map((option) => (
            
            <option
              key={option.id ?? Math.random()}
              value={option ? option.id : 0}
            >
              {options ? option.name : "Loading..."}
            </option>

          ))}
        </select>
        <span className={styles.select__icon}>
          {loading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (
            <IconsLibrary
              symbol="arr-down"
              fill="var(--color-secondary)"
            ></IconsLibrary>
          )}
        </span>
      </div>
    </div>
  );
};

export default Select;
