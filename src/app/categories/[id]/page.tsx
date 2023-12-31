"use client";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import IconsLibrary from "@/app/components/icons/IconsLibrary";
import LogOutButton from "@/app/login/LogOutButton";
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

const Page = ({ params: { id }, searchParams: { category } }: pageParams) => {
  async function getSkills(id: string) {
    try {
      let res = await fetch("http://localhost:3000/api/skills");
      const data = await res.json();
      const skills = data.skills.filter(
        (skill: SkillProps) => skill.category_id === Number(id)
      );
      return skills;
    } catch (err) {
      console.log(err);
    }
  }

  const skills = use(getSkills(id));

  const dataBack = use(getSkills(id));

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
                    skill_id={skill_id}
                  />
                );
              }
            )}
        </div>
      </div>
      <hr />
      <div className={styles["logout-container"]}>
        <LogOutButton className={styles["logout-button"]} />
      </div>
    </main>
  );
};

export default Page;
