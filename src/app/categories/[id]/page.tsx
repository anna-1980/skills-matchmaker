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

// async function getSkills(id: string) {
//   let res = await fetch(`skills.json`);
//   const data = await res.json();
//   console.log("data", data);
//   const skills = data.filter((skill: any) => skill.category_id === id)[0];
//   return skills;
// }

const Page = ({ params: { id }, searchParams: { category } }: pageParams) => {
  // let { skills = {} } = use(getSkills(id));
  // and array with objects of skills
  const [skillId, setSkillId] = React.useState<string>(id);
  const [skills, setSkills] = React.useState<SkillProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const Skills = async (id: number) => {
    try {
      const res = await fetch(`../../skills.json`);
      console.log(res, "from Skills fetch");
      const data = await res.json();
      const skills = data.filter((skill: any) => skill.category_id === id)[0]
        .skills;
      console.log("skills", skills);
      setSkills(skills);
      if (skills && skills.length >= 1) {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // let skills = [
  //   {
  //     skill_id: 1,
  //     name: "HTML",
  //     level: 5,
  //     last_used: "2020-01-01",
  //     usedDaily: true,
  //     comment: "I like it",
  //   },
  //   {
  //     skill_id: 2,
  //     name: "CSS",
  //     level: 4,
  //     last_used: "2018-01-01",
  //     usedDaily: true,
  //     comment: "I like it",
  //   },
  //   {
  //     skill_id: 3,
  //     name: "JavaScript",
  //     level: 3,
  //     last_used: "2015-01-01",
  //     usedDaily: true,
  //     comment: "I like it",
  //   },
  //   {
  //     skill_id: 4,
  //     name: "React",
  //     level: 2,
  //     last_used: "2022-01-01",
  //     usedDaily: true,
  //     comment: "I like it",
  //   },
  //   {
  //     skill_id: 5,
  //     name: "Next.js",
  //     level: 1,
  //     last_used: "2023-01-01",
  //     usedDaily: true,
  //     comment: "I like it",
  //   },
  // ];

  let setNewSkill;

  useEffect(() => {
    setSkillId(id);
    if (skillId) {
      Skills(parseInt(id));

      console.log("function run");
    } else {
      console.log("no skills yet");
    }
  }, [skillId, id]);

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
