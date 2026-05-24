export type IId = string | undefined;

export interface ISubscriber {
  id: IId;
  name: string;
  surname: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  idNumber: string;
  gender: "male" | "female";
}

export interface ILoan {
  id: IId;
  subscriberId: string;
  bookId: string;
  borrowDate: string;
  returnDate: string;
}
