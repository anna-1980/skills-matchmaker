"use client";
import styles from "./page.module.scss";
import Select from "../components/select/Select";
import InputAutocomplete from "../components/input-autocomplete/InputAutocomplete";
import Textarea from "../components/textarea/Textarea";
import Button from "../components/button/Button";
import { useEffect, useState } from "react";
import LastUsed from "../components/last-used/LastUsed";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const dropdownOptions = [
  { id: 1, name: "Very Basic" },
  { id: 2, name: "Basic" },
  { id: 3, name: "Intermediate" },
  { id: 4, name: "Advanced" },
  { id: 5, name: "Expert" },
];

interface SkillList {
  id: number;
  name: string;
}

interface EventData {
  category: string;
  category_id: number;
  skillName: string;
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
  const searchParams = useSearchParams()!;

  const [catId, setCatId] = useState<number>(0);
  const [skillsOptions, setSkillsOption] = useState<SkillList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [formData, setFormData] = useState<EventData>({
    category: "",
    category_id: 0,
    skillName: "",
    skillLevel: 1,
    month: new Intl.DateTimeFormat("en", {
      month: "long",
      calendar: "gregory",
    }).format(new Date()),
    year: new Date().getFullYear().toString(),
    usedDaily: false,
    comment: "",
  });

  const Category = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/categories`);
      const data = await res.json();
      setCategoryOption(categoryOption.concat(data.categories.categories));
      setIsLoadingCategories(false);
    } catch (err) {
      setIsLoadingCategories(false);
      console.log(err);
    }
  };

  const Skills = async (catId: number) => {
    try {
      const res = await fetch(`skills-categories.json`);
      const data = await res.json();
      const skills = data.filter(
        (skill: any) => skill.category_id === (catId as number)
      )[0].skills;
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
      setFormData((prevState) => {
        return {
          ...prevState,
          category_id: catId,
        };
      });
    }
  }, [isLoading, formData.category, catId]);

  const handleSelectChange = (event: any) => {
    let optionId = event.target.value;
    event.target.name === "category" && setCatId(parseInt(optionId));
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
        ["skillName"]: event.name ? event.name : event,
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
    const params = new URLSearchParams(searchParams);
    params.set("category", formData.category);

    const requestBody = { ...formData };
    fetch("/api/skills", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    router.push(`/categories/${catId.toString()}` + "?" + params.toString());
  };

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
