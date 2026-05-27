"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { subscriberServerSchema } from "@/types/subscriber-t";
import type { ISubscriber, ISubscriberForm } from "@/types/subscriber-t";

interface IProps {
  selected: ISubscriber | undefined;
  onSaved: (subscriber: ISubscriber) => void;
}

export function SubscriberForm(props: IProps) {
  const { selected, onSaved } = props;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISubscriberForm>({
    resolver: zodResolver(subscriberServerSchema),
    mode: "onTouched",
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

  function onSubmit(values: ISubscriberForm) {
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : selected ? "Update Subscriber" : "Save Subscriber"}
      </Button>
    </form>
  );
}
