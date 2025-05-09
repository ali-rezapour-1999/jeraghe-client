import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PersianDateInputProps {
  name: string;
  label?: string;
  placeholder?: {
    year?: string;
    month?: string;
    day?: string;
  };
  disabled?: boolean;
  control: any
}

export const PersianDateInput = ({
  name,
  label = "تاریخ",
  placeholder = {
    year: "سال",
    month: "ماه",
    day: "روز",
  },
  disabled = false,
  control
}: PersianDateInputProps) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Input
                autoComplete="off"
                placeholder={placeholder.day}
                type="text"
                maxLength={2}
                disabled={disabled}
                className={`w-16 text-center ${fieldState.error ? "border-red-500 dark:border-red-400" : ""
                  }`}
                value={field.value?.day || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange({
                    ...field.value,
                    day: value,
                  });
                }}
              />
              <span className="text-gray-500">/</span>
              <Input
                autoComplete="off"
                placeholder={placeholder.month}
                type="text"
                maxLength={2}
                disabled={disabled}
                className={`w-16 text-center ${fieldState.error ? "border-red-500 dark:border-red-400" : ""
                  }`}
                value={field.value?.month || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange({
                    ...field.value,
                    month: value,
                  });
                }}
              />
              <span className="text-gray-500">/</span>
              <Input
                autoComplete="off"
                placeholder={placeholder.year}
                type="text"
                maxLength={4}
                disabled={disabled}
                className={`w-20 text-center ${fieldState.error ? "border-red-500 dark:border-red-400" : ""
                  }`}
                value={field.value?.year || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange({
                    ...field.value,
                    year: value,
                  });
                }}
              />

            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-sm" />
        </FormItem>
      )}
    />
  );
};
