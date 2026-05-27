"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/parts/text-field";
import { SubmitButton } from "@/components/parts/submit-button";
import type { ISubscriber } from "@/types/subscriber-t";

const searchSchema = z
  .object({
    name: z.string().optional(),
    surname: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.name || data.surname || data.phone, {
    message: "Please enter at least one search term",
    path: ["name"],
  });

interface ISearchFormValues {
  name?: string;
  surname?: string;
  phone?: string;
}

interface IProps {
  subscribers: ISubscriber[];
  onSearch: (results: ISubscriber[]) => void;
}

export function SubscriberSearchForm(props: IProps) {
  const { subscribers, onSearch } = props;
  const form = useForm<ISearchFormValues>({
    resolver: zodResolver(searchSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
    },
  });

  function onSubmit(values: ISearchFormValues) {
    const results = subscribers.filter((s) => {
      const matchName = values.name
        ? s.name.toLowerCase().includes(values.name.toLowerCase())
        : true;
      const matchSurname = values.surname
        ? s.surname.toLowerCase().includes(values.surname.toLowerCase())
        : true;
      const matchPhone = values.phone
        ? s.phone.toLowerCase().includes(values.phone.toLowerCase())
        : true;
      return matchName && matchSurname && matchPhone;
    });
    onSearch(results);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="grid grid-cols-3 gap-4">
          <TextField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Search by name"
          />
          <TextField
            control={form.control}
            name="surname"
            label="Surname"
            placeholder="Search by surname"
          />
          <TextField
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Search by phone"
          />
        </div>
        <SubmitButton label="Search" />
      </form>
    </Form>
  );
}
