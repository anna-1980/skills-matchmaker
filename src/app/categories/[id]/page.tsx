"use client";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import IconsLibrary from "@/app/components/icons/IconsLibrary";
import React, { use } from "react";
import styles from "./page.module.scss";

interface pageParams {
  params: { id: string };
  searchParams: { category: string };
}

export interface SkillProps {
  skill_id: number;
  name: string;
  level: number;
  last_used: string;
  usedDaily: boolean;
  comment: string;
}
export interface NewSkillProps {
  skill_id: string;
  category: string;
  skill: string;
  skillLevel: string;
  month: string;
  year: string;
  usedDaily?: boolean;
  comment: string;
}

async function getSkills(id: string) {
  let res = await fetch(
    `http://37.114.34.4:5000/api/users/1/categories/${id}/skills`
  );
  return res.json();
}

const Page = ({ params: { id }, searchParams: { category } }: pageParams) => {
  // let { skills = {} } = use(getSkills(id));
  // and array with objects of skills
  let skills = [
    {
      skill_id: 1,
      name: "HTML",
      level: 5,
      last_used: "2020-01-01",
      usedDaily: true,
      comment: "I like it",
    },
    {
      skill_id: 2,
      name: "CSS",
      level: 4,
      last_used: "2018-01-01",
      usedDaily: true,
      comment: "I like it",
    },
    {
      skill_id: 3,
      name: "JavaScript",
      level: 3,
      last_used: "2015-01-01",
      usedDaily: true,
      comment: "I like it",
    },
    {
      skill_id: 4,
      name: "React",
      level: 2,
      last_used: "2022-01-01",
      usedDaily: true,
      comment: "I like it",
    },
    {
      skill_id: 5,
      name: "Next.js",
      level: 1,
      last_used: "2023-01-01",
      usedDaily: true,
      comment: "I like it",
    },
  ];

  let setNewSkill;

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
                name,
                level,
                last_used,
                usedDaily,
                comment,
              }: SkillProps) => {
                return (
                  <Card
                    key={`skill ${skill_id}`}
                    usedDaily={usedDaily ? usedDaily : false}
                    skillName={name}
                    skillLevel={level}
                    lastUsed={last_used}
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
