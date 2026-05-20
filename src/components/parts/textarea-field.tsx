import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  maxLength?: number; // ✅ NEW: for character counter
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  maxLength,
}: IProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // ✅ NEW: Get current character count
        const currentLength = (field.value as string)?.length ?? 0;

        return (
          <FormItem>
            <div className="flex justify-between items-center">
              <FormLabel>{label}</FormLabel>
              {maxLength && (
                <span className="text-xs text-muted-foreground">
                  {currentLength}/{maxLength}
                </span>
              )}
            </div>
            <FormControl>
              <Textarea
                placeholder={placeholder ?? label}
                maxLength={maxLength}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
