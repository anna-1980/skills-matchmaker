import Button from "./components/button/Button";
import CategoriesList from "./components/category-list/CategoryList";
import IconsLibrary from "./components/icons/IconsLibrary";
import styles from "./page.module.scss";
import { Session } from "next-auth";
import { headers } from "next/headers";
import GetUser from "./components/get-user/GetUser";
import LogOutButton from "./login/LogOutButton";
import NoSkillInfo from "./components/no-skill-info/NoSkillInfo";

// async function getCategories() {
//   let res = await fetch("api/categories.json");
//   return res.json();
// }

// const fetchData = async (host: string) => {
//   const res = await fetch(`http://${host}/api/categories`);
//   return res.json();
// };

export default async function Home({}) {
  // const host = headers().get("host");
  // const data = await fetchData(host!);

  // let { categoriess = [] } = await getCategories();
  // let { categories = [] } = data;
  // and array with objects of categories
  let categories = [
    {
      id: 1,
      name: "Frontend",
    },
    {
      id: 2,
      name: "Backend",
    },
    {
      id: 3,
      name: "DevOps",
    },
    {
      id: 4,
      name: "Design",
    },
    {
      id: 5,
      name: "Project Management",
    },
  ];

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
                  fill="var(--color-secondary-dark)"
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
