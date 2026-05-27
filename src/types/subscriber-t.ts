import { z } from "zod"

export interface ISubscriber {
  id?: string
  name: string
  surname: string
  phone: string
  email: string
  dateOfBirth: string
  idNumber: string
  gender: "male" | "female"
}

export interface ISubscriberForm {
  name: string
  surname: string
  phone: string
  email: string
  dateOfBirth: string
  idNumber: string
  gender: "male" | "female"
}

export interface ILoan {
  id?: string
  subscriberId: string
  bookId: string
  borrowDate: string
  returnDate: string
}

export interface ILoanForm {
  subscriberId: string
  bookId: string
  borrowDate: string
  returnDate: string
}

export interface ILoanFormErrors {
  subscriberId?: string
  bookId?: string
  borrowDate?: string
  returnDate?: string
}

export const subscriberServerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  idNumber: z.string().min(1, "ID number is required"),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
})

export const loanServerSchema = z.object({
  subscriberId: z.string().min(1, "Subscriber is required"),
  bookId: z.string().min(1, "Book is required"),
  borrowDate: z.string().min(1, "Borrow date is required"),
  returnDate: z.string().min(1, "Return date is required"),
})
