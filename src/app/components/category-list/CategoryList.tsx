import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import styles from "./CategoryList.module.scss";
import IconsLibrary from "../icons/IconsLibrary";
import Button from "../button/Button";
import cn from "classnames";
import Link from "next/link";

interface CategoriesListProps {
  className?: string;
  children: React.ReactNode;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}

const CategoriesList = ({
  children,
  className,
  categories,
}: CategoriesListProps) => {
  return (
    <div className={cn(styles.categories, className)}>
      <div className={styles["add-skill-btn--top"]}>{children}</div>
      <ul className={styles["categories-list"]}>
        {categories &&
          categories.map(({ id, name }) => {
            return (
              <li key={id} className={styles["categories-list__item"]}>
                <Button
                  LinkProps={{
                    href: {
                      pathname: `/categories/${id}`,
                      query: { category: name },
                    },
                  }}
                  priority="secondary"
                  expanded
                  className={styles["categories-list__button"]}
                  iconR={
                    <IconsLibrary symbol="arr-right" size="24px" fill="white" />
                  }
                >
                  {name}
                </Button>
              </li>
            );
          })}

        <li
          className={`${styles["categories-list__item"]} ${styles["add-skill-btn--bottom"]}`}
        >
          {children}
        </li>
      </ul>
    </div>
  );
};

export default CategoriesList;
