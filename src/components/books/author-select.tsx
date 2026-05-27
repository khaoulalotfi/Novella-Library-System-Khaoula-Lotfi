"use client";

import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { IBookForm } from "@/types/book-t"
import type { IOption } from "@/types/form-t"

interface IProps {
  control: Control<IBookForm>
  authorOptions: IOption[]
  error?: string
}

export function AuthorSelect(props: IProps) {
  const { control, authorOptions, error } = props;
  return (
    <div className="space-y-1">
      <Label>Author(s)</Label>
      <Controller
        control={control}
        name="authors"
        render={({ field }) => {
          const picked: string[] = Array.isArray(field.value)
            ? field.value
            : [];
          return (
            <>
              <Select
                onValueChange={(val) => {
                  if (!picked.includes(val)) field.onChange([...picked, val]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select author(s)" />
                </SelectTrigger>
                <SelectContent>
                  {authorOptions
                    .filter((o) => !picked.includes(o.id))
                    .map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {picked.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {picked.map((val) => {
                    const opt = authorOptions.find((o) => o.id === val);
                    return (
                      <Badge key={val} variant="outline" className="gap-x-1">
                        {opt?.title ?? val}
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(picked.filter((v) => v !== val))
                          }
                          className="text-muted-foreground hover:text-destructive ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </>
          );
        }}
      />
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
}
