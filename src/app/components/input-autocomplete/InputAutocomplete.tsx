import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";
import Label from "../label/Label";
import "./custom-select.scss";
import { randomUUID } from "crypto";

export default function InputAutocomplete({
  label,
  name,
  option,
  loading,
  onChange,
}: any) {
  const [isLoading, setIsLoading] = useState(loading);
  const [options, setOptions] = useState(option);
  const [value, setValue] = useState<any | null>();

  const createOption = (label: string) => ({
    name: label,
  });

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);

    const newOption = createOption(inputValue);
    setIsLoading(false);
    setOptions((prev: any) => [...prev, newOption]);
    setValue(newOption);
    onChange(inputValue);
  };

  const handleChange = (newValue: any, actionMeta: any) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="input-autocomplete">
      {label && <Label label={label} name={name} />}
      <CreatableSelect
        id="needsId"
        instanceId="needsId"
        styles={{
          clearIndicator: () => ({}),
          indicatorsContainer: () => ({}),
          indicatorSeparator: () => ({}),
        }}
        className="custom-select"
        classNamePrefix="custom-select"
        isClearable
        name={name}
        isDisabled={loading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={option.concat(options)}
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name}
        value={value}
      />
    </div>
  );
}
