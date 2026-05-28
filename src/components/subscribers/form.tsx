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
import { createSubscriberSchema } from "@/types/subscriber-t";
import type { ISubscriber, ISubscriberForm } from "@/types/subscriber-t";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  selected: ISubscriber | undefined;
  onSaved: (subscriber: ISubscriber) => void;
  dict: IDict["subscribers"];
}

export function SubscriberForm(props: IProps) {
  const { selected, onSaved, dict } = props;

  const schema = createSubscriberSchema({
    nameRequired: dict.errNameRequired,
    surnameRequired: dict.errSurnameRequired,
    phoneRequired: dict.errPhoneRequired,
    emailInvalid: dict.errEmailInvalid,
    dateOfBirthRequired: dict.errDateOfBirthRequired,
    idNumberRequired: dict.errIdNumberRequired,
    genderRequired: dict.errGenderRequired,
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISubscriberForm>({
    resolver: zodResolver(schema),
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
        <Label>{dict.formName}</Label>
        <Input {...register("name")} placeholder={dict.formNamePlaceholder} />
        {errors.name && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.name.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>{dict.formSurname}</Label>
        <Input {...register("surname")} placeholder={dict.formSurnamePlaceholder} />
        {errors.surname && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.surname.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>{dict.formPhone}</Label>
        <Input {...register("phone")} placeholder={dict.formPhonePlaceholder} />
        {errors.phone && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.phone.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>{dict.formEmail}</Label>
        <Input {...register("email")} placeholder={dict.formEmailPlaceholder} />
        {errors.email && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.email.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>{dict.formDateOfBirth}</Label>
        <Input {...register("dateOfBirth")} type="date" />
        {errors.dateOfBirth && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.dateOfBirth.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>{dict.formIdNumber}</Label>
        <Input {...register("idNumber")} placeholder={dict.formIdNumberPlaceholder} />
        {errors.idNumber && (
          <p className="text-destructive text-xs font-medium">
            {String(errors.idNumber.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>{dict.formGender}</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={dict.formGenderPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{dict.formMale}</SelectItem>
                <SelectItem value="female">{dict.formFemale}</SelectItem>
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
        {isSubmitting ? dict.saving : selected ? dict.updateSubscriber : dict.saveSubscriber}
      </Button>
    </form>
  );
}
