export enum CategoryColors {
  Blog = "#529B03",
  UI = "#ED8936",
}

export interface StoryblokTag {
  name: keyof typeof CategoryColors;
}

export interface CategorySelectProps {
  items: Array<StoryblokTag>;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
