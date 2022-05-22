import React from "react";
import Select from "react-select";
import { CategorySelectProps } from "./CategorySelect.types";
import { colourStyles } from "./CategorySelect.styles";

const CategorySelect: React.FC<CategorySelectProps> = ({
  items,
  onChange,
  value,
  placeholder,
}) => {
  const [selectValue, setSelectValue] = React.useState(value);

  const handleChange = (option: any) => {
    onChange(option.value);
    setSelectValue(option);
  };

  return (
    <Select
      instanceId="category-select"
      options={items}
      styles={colourStyles}
      onChange={handleChange}
      value={selectValue}
      placeholder={placeholder}
    />
  );
};

export default CategorySelect;
