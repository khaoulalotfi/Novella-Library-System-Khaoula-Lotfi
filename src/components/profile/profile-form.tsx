"use client";

import { useActionState } from "react";
import { useState } from "react";
import { profileAction } from "@/actions/profile-action";
import { SubmitButton } from "@/components/parts/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IState } from "@/types/shared-t";
import type { IDict } from "@/lib/dictionary";

const initialState: IState = {
  isSaved: false,
  message: "",
  errors: undefined,
};

interface IProps {
  dict: IDict["profile"];
}

export function ProfileForm(props: IProps) {
  const { dict } = props;

  const [state, formAction] = useActionState<IState, FormData>(
    profileAction,
    initialState,
  );
  const [gender, setGender] = useState<string>("male");

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="space-y-4 w-full sm:w-96" action={formAction} noValidate>
        <h1 className="text-2xl font-bold text-primary">
          {dict.heading}
        </h1>
        <p className="text-muted-foreground text-sm">
          {dict.description}
        </p>
        <div className="space-y-1">
          <Label>{dict.name}</Label>
          <Input name="name" placeholder={dict.namePlaceholder} />
          {state.errors?.name && (
            <p className="text-xs text-destructive">
              {state.errors.name.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{dict.surname}</Label>
          <Input name="surname" placeholder={dict.surnamePlaceholder} />
          {state.errors?.surname && (
            <p className="text-xs text-destructive">
              {state.errors.surname.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{dict.phone}</Label>
          <Input name="phone" placeholder={dict.phonePlaceholder} />
          {state.errors?.phone && (
            <p className="text-xs text-destructive">
              {state.errors.phone.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{dict.dateOfBirth}</Label>
          <Input name="dateOfBirth" type="date" />
          {state.errors?.dateOfBirth && (
            <p className="text-xs text-destructive">
              {state.errors.dateOfBirth.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{dict.idNumber}</Label>
          <Input name="idNumber" placeholder={dict.idNumberPlaceholder} />
          {state.errors?.idNumber && (
            <p className="text-xs text-destructive">
              {state.errors.idNumber.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{dict.gender}</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder={dict.genderPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{dict.male}</SelectItem>
              <SelectItem value="female">{dict.female}</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="gender" value={gender} />
          {state.errors?.gender && (
            <p className="text-xs text-destructive">
              {state.errors.gender.join(" | ")}
            </p>
          )}
        </div>
        <SubmitButton label={dict.completeRegistration} savingLabel={dict.saving} />
        {state.errors?.general && (
          <div className="p-1 bg-red-100 italic text-sm">
            {state.errors.general.join(" | ")}
          </div>
        )}
        <div
          className={`text-sm italic p-1 ${state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""}`}
        >
          {state?.message}
        </div>
      </form>
    </div>
  );
}
