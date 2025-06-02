import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IsLoading } from "@/components/shared/isLoading";
import { useMemo } from "react";
import { EnumItemType } from "@/types/enumType";

type EnumSelectProps = {
  onSelect: (select: string) => void;
  placeholder?: string;
  value?: string;
  isLoading?: boolean;
  enumData?: EnumItemType[];
};

const EnumSelect = ({
  onSelect,
  placeholder = "یک گزینه را انتخاب کنید",
  value,
  isLoading = false,
  enumData = [],
}: EnumSelectProps) => {

  const handleSelectChange = (selectedId: string) => {
    onSelect(selectedId);
  };

  const selectedEnumTitle = useMemo(() => {
    const selected = enumData.find((item) => item.value === value);
    return selected ? selected.label : "";
  }, [value, enumData]);

  console.log(enumData)
  return (
    <Select onValueChange={handleSelectChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}>{selectedEnumTitle}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <IsLoading />
        ) : (
          <SelectGroup>
            {enumData.map((item) => (
              <SelectItem
                key={item.value as string}
                value={item.value as string}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};

export default EnumSelect;
