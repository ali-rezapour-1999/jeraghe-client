import React, { useEffect, useState, useCallback } from "react";
import { IsLoading } from "@/components/shared/isLoading";
import { Paragraph } from "../text";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "../button";
import { LuChevronsUpDown } from "react-icons/lu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { CategoryState } from "@/types/ideaStateType";
import { useCategroryState } from "@/store/categoryState";
import { Category } from "@/types/baseType";

interface CategorySelectProps {
  value: Category | null | undefined;
  onChange: (selectedCategory: Category | null) => void;
  label?: string;
  placeholder?: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  label = "دسته‌بندی",
  placeholder = "انتخاب دسته‌بندی...",
}) => {
  const { categoryData, categoryList, isLoading } = useCategroryState() as CategoryState;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (categoryList) {
      categoryList();
    }
  }, [categoryList]);
  console.log("categoryData", categoryData);

  const handleCategorySelect = useCallback(
    (itemId: string) => {
      const selected = categoryData?.find((cat) => cat.id === itemId) || null;
      onChange(selected);
      setOpen(false);
    },
    [categoryData, onChange]
  );

  return (
    <div className="flex flex-col w-full">
      {label && (
        <Paragraph className="font-bold text-xl mb-2">{label}</Paragraph>
      )}
      {isLoading ? (
        <IsLoading />
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-primary/20 hover:border-primary hover:bg-transparent"
            >
              {value?.title || placeholder}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
            <Command>
              <CommandInput
                placeholder="جستجو در دسته‌بندی‌ها..."
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>چیزی پیدا نشد.</CommandEmpty>
                <CommandGroup>
                  {(categoryData || []).map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={handleCategorySelect}
                      className="cursor-pointer"
                    >
                      {item.title}
                      <Check
                        className={cn("ml-auto h-4 w-4",
                          value?.id === item.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default CategorySelect;
