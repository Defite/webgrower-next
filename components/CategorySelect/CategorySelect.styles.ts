import { StylesConfig } from "react-select";
import { ColourOption } from "./CategorySelect.types";

export const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled }) => {
    return {
      ...styles,
      ...dot(data.color),
      backgroundColor: undefined,
      color: isDisabled ? "#ccc" : "#000",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        backgroundColor: "#F7FAFC",
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};
