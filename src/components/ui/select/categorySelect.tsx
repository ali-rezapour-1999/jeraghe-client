import { IsLoading } from "@/components/shared/isLoading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryState } from "@/types/ideaStateType";
import { useCategroryState } from "@/store/categoryState";
import { useEffect, useMemo } from "react";
import { Category } from "@/types/baseType";

type CategorySelectProps = {
  onSelect: (selectedCategory: string) => void;
  placeholder?: string;
  autoFetch?: boolean;
  value?: string;
};

const CategorySelect = ({ onSelect, placeholder = "دسته بندی رو انتخاب کنید", autoFetch = true, value }: CategorySelectProps) => {
  const { categoryData, categoryList, isLoading } = useCategroryState() as CategoryState;

  useEffect(() => {
    if (autoFetch) categoryList();
  }, [autoFetch]);


  const handleSelectChange = (selectedId: string) => {
    onSelect(selectedId);
  };

  const selectedCategoryTitle = useMemo(() => {
    const selected = categoryData?.find((item) => item.ID.toString() === value);
    return selected?.title || "";
  }, [value, categoryData]);


  return (
    <Select onValueChange={handleSelectChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}>{selectedCategoryTitle}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <IsLoading />
        ) : (
          <SelectGroup>
            {(categoryData || []).map((item: Category) => (
              <SelectItem key={item.ID} value={item.ID.toString()}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
