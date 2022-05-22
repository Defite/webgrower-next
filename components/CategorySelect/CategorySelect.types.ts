export enum CategoryColors {
  blog = "#529B03",
  ui = "#ED8936",
}

export interface Category {
  uuid: string;
  content: {
    title: string;
    slug: keyof typeof CategoryColors;
  };
}

export interface CategorySelectProps {
  items: Array<ColourOption>;
  onChange: (value: string) => void;
  value: ColourOption | undefined;
  placeholder?: string;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
