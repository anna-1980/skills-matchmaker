"use client";

import Button from "../button/Button";
import IconsLibrary from "../icons/IconsLibrary";
import Input from "../input/Input";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function SearchBar() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.target as HTMLFormElement);
    router.push(`/results?q=${formData.get("q")}`);
  };

  return (
    <form className={`${styles["search-bar"]}`} onSubmit={handleSubmit}>
      <Input
        placeholder="Search your colleagues by skill"
        name="q"
        position="right"
        className={styles["search-bar__input"]}
      >
        <Button clean>
          <IconsLibrary symbol="search" size="18px" fill="#fff" />
        </Button>
      </Input>
    </form>
  );
}
export default SearchBar;
