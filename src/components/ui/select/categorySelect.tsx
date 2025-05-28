
import { IsLoading } from "@/components/shared/isLoading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { CategoryState } from '@/types/ideaStateType';
import { useCategroryState } from '@/store/categoryState';


const CategorySelect = ({ onSelect }: { onSelect: (selectedCategory: string) => void }) => {
  const { categoryData, isLoading } = useCategroryState() as CategoryState;
  return <Select>
    <SelectTrigger className="w-full py-2">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      {isLoading ? (
        <IsLoading />
      ) : (
        <SelectGroup>
          {(categoryData || []).map((item) => (
            <SelectItem
              key={item.id}
              value={item.id}
              onSelect={() => onSelect(item.id)}
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      )}
    </SelectContent>
  </Select>


}
export default CategorySelect;
