import { ColourOption, CategoryColors, Category } from "./CategorySelect.types";

export function useCategorySelect(items: Array<Category>): Array<ColourOption> {
  return items.map((item) => {
    return {
      value: item.content.slug,
      label: item.content.title,
      color: CategoryColors[item.content.slug],
    };
  });
}
