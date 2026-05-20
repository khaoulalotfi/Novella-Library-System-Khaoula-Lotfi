export type IId = string | undefined;

export interface IBook {
  id: IId;
  inventoryNumber: number;
  code: IId;
  codeValue?: string;
  authors: string[];
  authorNames?: string[];
  title: string;
  price: number;
  publisher: IId;
  publisherName?: string;
  year: number;
  annotation: string;
}

export interface IAuthor {
  id: IId;
  name: string;
}

export interface IPublisher {
  id: IId;
  name: string;
}

export interface ICode {
  id: IId;
  value: string;
}
