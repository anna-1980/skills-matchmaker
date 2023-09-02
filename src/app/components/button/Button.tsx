"use client";
import styles from "./Button.module.scss";
import cn from "classnames";
import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import React from "react";
export type ButtonSize = "icon" | "small" | "medium" | "large";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  priority?: string;
  size?: ButtonSize;
  onClick?: () => void;
  iconL?: any;
  iconR?: any;
  children?: React.ReactNode;
  disabled?: boolean;
  expanded?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  clean?: boolean;
  LinkProps?: LinkProps;
}

const Button: FC<ButtonProps> = ({
  className,
  priority = "primary",
  size = "medium",
  onClick = () => {},
  iconL,
  iconR,
  children,
  disabled,
  expanded,
  type = "button",
  clean,
  LinkProps,
}) => {
  const buttonClass = cn(
    styles.btn,
    {
      [styles["btn--primary"]]: priority === "primary",
      [styles["btn--secondary"]]: priority === "secondary",
      [styles["btn--accent"]]: priority === "accent",
      [styles["btn--tertiary"]]: priority === "tertiary",
      [styles["btn--icon"]]: size === "icon",
      [styles["btn--transparent"]]: priority === "transparent",
      [styles["btn--small"]]: size === "small",
      [styles["btn--large"]]: size === "large",
      [styles["btn--expanded"]]: expanded,
      [styles["btn--clean"]]: clean,
    },
    className
  );

  const iconClasses = cn(
    iconL ? styles["icon-left-side"] : "",
    iconR ? styles["icon-right-side"] : ""
  );

  return (
    <>
      {LinkProps ? (
        <Link {...LinkProps} onClick={onClick} className={cn(buttonClass)}>
          {iconL ? <div className={iconClasses}>{iconL}</div> : null}
          <span className={styles.btn__label}>{children}</span>
          {iconR ? <div className={iconClasses}>{iconR}</div> : null}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={buttonClass}
          disabled={disabled}
          type={type}
        >
          {iconL ? <div className={iconClasses}>{iconL}</div> : null}
          <span className={styles.btn__label}>{children}</span>
          {iconR ? <div className={iconClasses}>{iconR}</div> : null}
        </button>
      )}
    </>
  );
};

export default Button;
