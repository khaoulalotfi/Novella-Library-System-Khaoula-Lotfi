export type IId = string | undefined;

export interface IBook {
  id: IId;
  inventoryNumber: string;
  code: string;
  authors: string;
  title: string;
  price: string;
  publisher: string;
  year: string;
  annotation: string;
}
