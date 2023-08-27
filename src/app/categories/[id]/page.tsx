"use client";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import IconsLibrary from "@/app/components/icons/IconsLibrary";
import React, { use, useEffect } from "react";
import styles from "./page.module.scss";

interface pageParams {
  params: { id: string };
  searchParams: { category: string };
}

export interface SkillProps {
  skill_id: string;
  category: string;
  category_id: number;
  skillName: string;
  skillLevel: number;
  month: string;
  year: string;
  usedDaily?: boolean;
  comment: string;
}

// async function getSkills(id: string) {
//   let res = await fetch(`skills.json`);
//   const data = await res.json();
//   console.log("data", data);
//   const skills = data.filter((skill: any) => skill.category_id === id)[0];
//   return skills;
// }

const Page = ({ params: { id }, searchParams: { category } }: pageParams) => {
  async function getSkills(id: string) {
    console.log("id", id);
    try {
      let res = await fetch("http://localhost:3000/api/skills");
      const data = await res.json();
      console.log("data", data);
      const skills = data.skills.filter(
        (skill: SkillProps) => skill.category_id === Number(id)
      );
      console.log("skills from fetch", skills);
      return skills;
    } catch (err) {
      console.log(err);
    }
  }

  const skills = use(getSkills(id));

  console.log("Skills destructured", skills);
  const dataBack = use(getSkills(id));
  // console.log("dataBack", dataBack);
  // const [skillId, setSkillId] = React.useState<string>(id);
  // const [skills, setSkills] = React.useState<SkillProps[]>([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  // const Skills = async (id: number) => {
  //   try {
  //     const res = await fetch(`../../skills.json`);
  //     // console.log(res, "from Skills fetch");
  //     const data = await res.json();
  //     const skills = data.filter((skill: any) => skill.category_id === id)[0]
  //       .skills;
  //     console.log("skills", skills);
  //     setSkills(skills);
  //     if (skills && skills.length >= 1) {
  //       setIsLoading(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {

  // }, []);
  // filter skills for categories
  // const filterSkills = skills.filter((skill: any) => skill.category === id);
  // console.log("FIltered skills", filterSkills);

  return (
    <main className={styles["skills-page"]}>
      <div className={styles.skills}>
        <h4 className={styles.skills__heading}>
          Your skills in Category:<em>&nbsp; {category}</em>
        </h4>
        <div className={styles.skills__btn}>
          <Button
            LinkProps={{
              href: {
                pathname: `/add-skill`,
              },
            }}
            priority="accent"
            expanded
            iconL={<IconsLibrary symbol="add" size="22px" fill="secondary" />}
          >
            Add skill
          </Button>
        </div>

        <div className={styles["skills__category-list"]}>
          {skills &&
            skills.map(
              ({
                skill_id,
                skillName,
                skillLevel,
                year,
                month,
                usedDaily,
                comment,
              }: SkillProps) => {
                return (
                  <Card
                    key={`skill ${skill_id}`}
                    usedDaily={usedDaily ? usedDaily : false}
                    skillName={skillName}
                    skillLevel={skillLevel}
                    lastUsed={month + " " + year}
                    comment={comment}
                  />
                );
              }
            )}
        </div>
      </div>
    </main>
  );
};

export default Page;
