import styles from "./Textarea.module.scss";
import Label from "../label/Label";
import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import cn from "classnames";

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  label?: string;
  name: string;
  content?: string;
  placeholder: string;
  wrap?: "hard" | "soft";
  maxlength?: number;
  rows?: number;
  onChange?: any;
  value?: string;
}

const Textarea: FC<TextareaProps> = ({
  name,
  label,
  content,
  placeholder,
  wrap,
  maxlength,
  rows,
  onChange,
  className,
  value,
}) => {
  return (
    <div className={cn(styles.textarea, className)}>
      {label && <Label label={label} name={name} />}
      <div className={styles.textarea__field}>
        <textarea
          className={styles.textarea__control}
          placeholder={placeholder}
          name={name}
          id={name}
          wrap={wrap}
          maxLength={maxlength}
          rows={rows}
          onChange={onChange}
          value={value ?? ""}
        >
          {content}
        </textarea>
      </div>
    </div>
  );
};

export default Textarea;
