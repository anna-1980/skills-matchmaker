import Button from "./components/button/Button";
import CategoriesList from "./components/category-list/CategoryList";
import IconsLibrary from "./components/icons/IconsLibrary";
import styles from "./page.module.scss";
import { Session } from "next-auth";
import { headers } from "next/headers";
import GetUser from "./components/get-user/GetUser";
import LogOutButton from "./login/LogOutButton";
import NoSkillInfo from "./components/no-skill-info/NoSkillInfo";

export default async function Home({}) {
  async function getCategories() {
    try {
      let res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      const categories = data.categories;
      return categories;
    } catch (err) {
      console.log(err);
    }
  }

  const { categories = {} } = await getCategories();

  return (
    <main>
      <h1 className={styles["logout-greeting"]}>
        {new Date().getHours() < 12
          ? "Good Morning"
          : new Date().getHours() < 18
          ? "Good Afternoon"
          : "Good Evening"}
        &nbsp;
        {<GetUser></GetUser>}
      </h1>
      <hr />
      {categories.length === 0 ? (
        <NoSkillInfo />
      ) : (
        <>
          <p>Select a category to see the maintained skills in it.</p>
          <CategoriesList className={styles.categories} categories={categories}>
            <Button
              LinkProps={{
                href: {
                  pathname: `/add-skill`,
                },
              }}
              priority="accent"
              expanded
              iconL={
                <IconsLibrary
                  symbol="add"
                  size="20px"
                  fill="$color-secondary-dark"
                />
              }
            >
              Add skill
            </Button>
          </CategoriesList>
        </>
      )}
      <hr />
      <div className={styles["logout-container"]}>
        <LogOutButton className={styles["logout-button"]} />
      </div>
    </main>
  );
}
