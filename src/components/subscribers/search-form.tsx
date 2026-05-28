"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/parts/text-field";
import { SubmitButton } from "@/components/parts/submit-button";
import type { ISubscriber } from "@/types/subscriber-t";
import type { IDict } from "@/lib/dictionary";

interface ISearchFormValues {
  name?: string;
  surname?: string;
  phone?: string;
}

interface IProps {
  subscribers: ISubscriber[];
  onSearch: (results: ISubscriber[]) => void;
  dict: IDict["subscribers"];
}

export function SubscriberSearchForm(props: IProps) {
  const { subscribers, onSearch, dict } = props;

  const searchSchema = z
    .object({
      name: z.string().optional(),
      surname: z.string().optional(),
      phone: z.string().optional(),
    })
    .refine((data) => data.name || data.surname || data.phone, {
      message: dict.errSearchRequired,
      path: ["name"],
    });

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
            label={dict.colName}
            placeholder={dict.searchByName}
          />
          <TextField
            control={form.control}
            name="surname"
            label={dict.colSurname}
            placeholder={dict.searchBySurname}
          />
          <TextField
            control={form.control}
            name="phone"
            label={dict.colPhone}
            placeholder={dict.searchByPhone}
          />
        </div>
        <SubmitButton label={dict.search} />
      </form>
    </Form>
  );
}
