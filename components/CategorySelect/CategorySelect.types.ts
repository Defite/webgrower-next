export enum CategoryColors {
  blog = "#529B03",
  ui = "#ED8936",
}

export interface StoryblokTag {
  name: keyof typeof CategoryColors;
}

export interface CategorySelectProps {
  items: Array<StoryblokTag>;
  onChange: (value: string) => void
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
