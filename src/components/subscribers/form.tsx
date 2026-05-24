"use client";

import { useForm, Controller } from "react-hook-form";
import type { ResolverResult } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ISubscriber } from "@/types/subscriber-t";

const subscriberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  idNumber: z.string().min(1, "ID number is required"),
  gender: z.enum(["male", "female"], { error: "Gender is required" }),
});

interface SubscriberFormValues {
  name: string;
  surname: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  idNumber: string;
  gender: "male" | "female";
}

async function subscriberResolver(
  values: SubscriberFormValues,
): Promise<ResolverResult<SubscriberFormValues>> {
  const result = await subscriberSchema.safeParseAsync(values);
  if (result.success) {
    return { values: result.data as SubscriberFormValues, errors: {} };
  }
  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) {
      errors[key] = { type: String(issue.code), message: issue.message };
    }
  }
  return { values: {}, errors };
}

interface IProps {
  selected: ISubscriber | undefined;
  onSaved: (subscriber: ISubscriber) => void;
}

export function SubscriberForm({ selected, onSaved }: IProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriberFormValues>({
    resolver: subscriberResolver,
    defaultValues: {
      name: selected?.name ?? "",
      surname: selected?.surname ?? "",
      phone: selected?.phone ?? "",
      email: selected?.email ?? "",
      dateOfBirth: selected?.dateOfBirth ?? "",
      idNumber: selected?.idNumber ?? "",
      gender: selected?.gender ?? "male",
    },
  });

  function onSubmit(values: SubscriberFormValues) {
    onSaved({ ...values, id: selected?.id });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
      autoComplete="off"
    >
      <div className="space-y-1">
        <Label>Name</Label>
        <Input {...register("name")} placeholder="Enter name" />
        {errors.name && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.name.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Surname</Label>
        <Input {...register("surname")} placeholder="Enter surname" />
        {errors.surname && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.surname.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Phone</Label>
        <Input {...register("phone")} placeholder="Enter phone number" />
        {errors.phone && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.phone.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input {...register("email")} placeholder="Enter email" />
        {errors.email && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.email.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Date of Birth</Label>
        <Input {...register("dateOfBirth")} type="date" />
        {errors.dateOfBirth && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.dateOfBirth.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>ID Number</Label>
        <Input {...register("idNumber")} placeholder="Enter ID number" />
        {errors.idNumber && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.idNumber.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Gender</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.gender.message ?? "")}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {selected ? "Update Subscriber" : "Save Subscriber"}
      </Button>
    </form>
  );
}
