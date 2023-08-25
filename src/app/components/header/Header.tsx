"use client";
import SearchBar from "../search-bar/SearchBar";
import styles from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const currentPath = usePathname();
  return (
    <>
      {currentPath !== "/login" && (
        <header className={styles.header}>
          <div className={`${styles.header__content} constraint`}>
            <Link href="/" className={styles["header__logo-container"]}>
              <img
                src="/logo.svg"
                alt="cool logo"
                className={styles.header__logo}
              />
            </Link>
            <SearchBar />
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
