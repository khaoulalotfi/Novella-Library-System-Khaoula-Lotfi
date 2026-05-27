import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IOption } from "@/types/form-t";
import type { Control, FieldValues, Path } from "react-hook-form";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: IOption[];
}

export function MultiSelectField<T extends FieldValues>(props: IProps<T>) {
  const { control, name, label, options } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: string[] = Array.isArray(field.value)
          ? field.value
          : [];

        function handleAdd(value: string) {
          if (!selected.includes(value)) {
            field.onChange([...selected, value]);
          }
        }

        function handleRemove(value: string) {
          field.onChange(selected.filter((v) => v !== value));
        }

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select onValueChange={handleAdd}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  {options
                    .filter((o) => !selected.includes(o.id))
                    .map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {selected.map((value) => {
                const option = options.find((o) => o.id === value);
                return (
                  <Badge key={value} variant="outline" className="gap-x-1">
                    {option?.title ?? value}
                    <button
                      type="button"
                      onClick={() => handleRemove(value)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
