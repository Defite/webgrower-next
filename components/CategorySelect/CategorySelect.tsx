import React from "react";
import Select from "react-select";
import { ColourOption, CategorySelectProps } from "./CategorySelect.types";
import { colourStyles } from "./CategorySelect.styles";
import { useCategorySelect } from "./CategorySelect.utils";

const CategorySelect: React.FC<CategorySelectProps> = ({
  items,
  onChange,
  value,
  placeholder,
}) => {
  const options = useCategorySelect(items);
  const [selectValue, setSelectValue] = React.useState(value);

  const handleChange = (option: any) => {
    onChange(option.value);
    setSelectValue(option);
  };

  return (
    <Select
      instanceId="category-select"
      options={options}
      styles={colourStyles}
      onChange={handleChange}
      value={selectValue}
      placeholder={placeholder}
    />
  );
};

export default CategorySelect;
