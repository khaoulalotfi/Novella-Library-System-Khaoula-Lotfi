"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface IProps {
  label: string;
}

export function SubmitButton(props: IProps) {
  const { label } = props;
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : label}
    </Button>
  );
}
