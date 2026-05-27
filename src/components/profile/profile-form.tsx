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

const initialState: IState = {
  isSaved: false,
  message: "",
  errors: undefined,
};

export function ProfileForm() {
  const [state, formAction] = useActionState<IState, FormData>(
    profileAction,
    initialState,
  );
  const [gender, setGender] = useState<string>("male");

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="space-y-4 w-full sm:w-96" action={formAction} noValidate>
        <h1 className="text-2xl font-bold text-primary">
          Complete Your Profile
        </h1>
        <p className="text-muted-foreground text-sm">
          Please fill in your details to complete your library membership.
        </p>
        <div className="space-y-1">
          <Label>Name</Label>
          <Input name="name" placeholder="Enter your name" />
          {state.errors?.name && (
            <p className="text-xs text-destructive">
              {state.errors.name.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Surname</Label>
          <Input name="surname" placeholder="Enter your surname" />
          {state.errors?.surname && (
            <p className="text-xs text-destructive">
              {state.errors.surname.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Phone</Label>
          <Input name="phone" placeholder="Enter your phone number" />
          {state.errors?.phone && (
            <p className="text-xs text-destructive">
              {state.errors.phone.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Date of Birth</Label>
          <Input name="dateOfBirth" type="date" />
          {state.errors?.dateOfBirth && (
            <p className="text-xs text-destructive">
              {state.errors.dateOfBirth.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>ID Number</Label>
          <Input name="idNumber" placeholder="Enter your ID number" />
          {state.errors?.idNumber && (
            <p className="text-xs text-destructive">
              {state.errors.idNumber.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="gender" value={gender} />
          {state.errors?.gender && (
            <p className="text-xs text-destructive">
              {state.errors.gender.join(" | ")}
            </p>
          )}
        </div>
        <SubmitButton label="Complete Registration" />
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
