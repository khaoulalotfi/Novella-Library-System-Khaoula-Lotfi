import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

interface IProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "placeholder"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

export function TextField<T extends FieldValues>(props: IProps<T>) {
  const { control, name, label, placeholder, type = "text", ...rest } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder ?? label}
              {...field}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
