"use client";
import styles from "./page.module.scss";
import Select from "../components/select/Select";
import InputAutocomplete from "../components/input-autocomplete/InputAutocomplete";
import Textarea from "../components/textarea/Textarea";
import Button from "../components/button/Button";
import { useEffect, useState } from "react";
import LastUsed from "../components/last-used/LastUsed";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createSourceFile } from "typescript";

const dropdownOptions = [
  { id: 1, name: "Beginner" },
  { id: 3, name: "Intermediate" },
  { id: 5, name: "Expert" },
];

interface SkillList {
  id: number;
  name: string;
}

interface EventData {
  category: string;
  skill: string;
  skillLevel: number;
  month: string;
  year: string;
  usedDaily?: boolean;
  comment: string;
}

export default function AddSkill() {
  const [categoryOption, setCategoryOption] = useState([
    { id: 0, name: "Select Category" },
  ]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [catId, setCatId] = useState<number>(0);
  const [skillsOptions, setSkillsOption] = useState<SkillList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [formData, setFormData] = useState<EventData>({
    category: "",
    skill: "",
    skillLevel: 0,
    month: new Intl.DateTimeFormat("en", {
      month: "long",
      calendar: "gregory",
    }).format(new Date()),
    year: new Date().getFullYear().toString(),
    usedDaily: false,
    comment: "",
  });

  // const Category = async () => {
  //   try {
  //     const res = await fetch(`http://37.114.34.4:5000/api/categories`);
  //     const data = await res.json();
  //     setCategoryOption(categoryOption.concat(data.categories));
  //     setIsLoadingCategories(false);
  //   } catch (err) {
  //     setIsLoadingCategories(false);
  //     console.log(err);
  //   }
  // };
  const Category = async () => {
    try {
      const res = await fetch(`categories.json`);
      const data = await res.json();
      console.log(data);
      setCategoryOption(categoryOption.concat(data.categories));
      setIsLoadingCategories(false);
    } catch (err) {
      setIsLoadingCategories(false);
      console.log(err);
    }
  };

  // const Skills = async (catId: number) => {
  //   try {
  //     const res = await fetch(
  //       `http://37.114.34.4:5000/api/skills/categories/${catId}`
  //     );
  //     const { skills } = await res.json();
  //     setSkillsOption(skills);
  //     if (skills && skills.length >= 1) {
  //       setIsLoading(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const Skills = async (catId: number) => {
    console.log(" catID Skills fetch ", catId, 1);

    try {
      const res = await fetch(`skills.json`);
      const data = await res.json();
      console.log(data, "from the state catID", catId);
      const skills = data.filter(
        (skill: any) => skill.category_id === (catId as number)
      )[0].skills;
      // console.log(skills, skills[0].skills[0]);
      setSkillsOption(skills);
      if (skills && skills.length >= 1) {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!catId) {
      Category();
    } else {
      Skills(catId);
    }
  }, [isLoading, catId]);

  const handleSelectChange = (event: any) => {
    const optionId = event.target.value;
    console.log("optionId", optionId);
    setCatId(parseInt(optionId));
    const value =
      event.target.name === "skillLevel"
        ? Number(event.target.value)
        : event.target.options[event.target.selectedIndex].text;
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });
  };

  const handleAutocompleteSelectChange = (event: any) => {
    const addedOption = event;
    setFormData((prevState) => {
      return {
        ...prevState,
        ["skill"]: event.name ? event.name : event,
      };
    });
  };

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requestBody = { ...formData };
    fetch("/api/practice", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  console.log(">>>from the state catID", catId);
  return (
    <main>
      <div>
        <p className={styles["page-title"]}>Add skill</p>
        <hr />
      </div>
      <form
        className={styles["page-content"]}
        onSubmit={onSubmit}
        method="POST"
      >
        <Select
          label="Skill Category"
          options={categoryOption}
          name="category"
          loading={isLoadingCategories}
          onChange={handleSelectChange}
        ></Select>
        <InputAutocomplete
          label="Skill Name"
          name="skill"
          option={skillsOptions ? skillsOptions : "Select something"}
          loading={isLoading}
          onChange={handleAutocompleteSelectChange}
        />
        <Select
          label="Skill Level"
          options={dropdownOptions}
          name="skillLevel"
          onChange={handleSelectChange}
        ></Select>
        <div className={styles["page-content__last-used"]}>
          <LastUsed
            onChange={handleInputChange}
            selectChange={handleSelectChange}
          ></LastUsed>
        </div>
        <Textarea
          label="Comment"
          name="comment"
          placeholder="Placeholder"
          maxlength={100}
          rows={3}
          value={formData.comment}
          onChange={handleInputChange}
        ></Textarea>
        <div className={styles["page-content__buttons"]}>
          <div className={styles["page-content__buttons--add"]}>
            <Button size="medium" priority="accent" expanded type="submit">
              Add a Skill
            </Button>
          </div>
          <div className={styles["page-content__buttons--cancel"]}>
            <Button size="medium" priority="tertiary" expanded>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
