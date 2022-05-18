import {
  ColourOption,
  CategoryColors,
  StoryblokTag,
} from "./CategorySelect.types";

export function useCategorySelect(
  tags: Array<StoryblokTag>
): Array<ColourOption> {
  return tags.map((tag: StoryblokTag) => {
    const value = tag.name.toLowerCase() as keyof typeof CategoryColors;

    return {
      value,
      label: tag.name,
      color: CategoryColors[value],
    };
  });
}
