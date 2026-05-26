import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, ...rest }: IProps) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input {...rest} />
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );
}
