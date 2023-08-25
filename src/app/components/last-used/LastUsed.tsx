import { useState } from "react";
import Checkbox from "../checkbox/Checkbox";
import Select, { Option } from "../select/Select";
import styles from "./LastUsed.module.scss";

interface LastUsedProps {
  onChange?: any;
  selectChange?: any;
}
let yearsGenerator: Option[] = [];
const howManyYearsBack = 20;
for (let i = 0; i < howManyYearsBack; i++) {
  yearsGenerator.push({
    id: i,
    name: (new Date().getFullYear() - howManyYearsBack + i).toString(),
  });
}

let monthsGenerator: Option[] = [];
for (let i = 0; i < 12; i++) {
  monthsGenerator.push({
    id: i,
    name: new Intl.DateTimeFormat("en", {
      month: "long",
      calendar: "gregory",
    }).format(new Date(0, i)),
  });
}

const LastUsed = ({ onChange, selectChange }: LastUsedProps) => {
  const [regularBasis, setRegularBasis] = useState(false);

  const observeCheckbox = (checkbox: React.BaseSyntheticEvent) => {
    setRegularBasis(!regularBasis);
    onChange(checkbox);
  };
 
  return (
    <div className={styles["last-used"]}>
      <Select
        name="month"
        label="Last used"
        placeholder="Month"
        options={monthsGenerator}
        className={styles["last-used__month"]}
        disabled={regularBasis}
        onChange={selectChange}
      />
      <Select
        name="year"
        label=""
        placeholder="Year"
        options={yearsGenerator}
        className={styles["last-used__year"]}
        disabled={regularBasis}
        onChange={selectChange}
      />
      <Checkbox
        name="usedDaily"
        className={styles["last-used__used-daily"]}
        onChange={observeCheckbox}
      >
        Used on regular basis
      </Checkbox>
    </div>
  );
};

export default LastUsed;
