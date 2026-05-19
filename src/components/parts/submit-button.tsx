import { Button } from "@/components/ui/button";

export function SubmitButton({ label }: { label: string }) {
  return (
    <Button type="submit" className="w-full">
      {label}
    </Button>
  );
}
