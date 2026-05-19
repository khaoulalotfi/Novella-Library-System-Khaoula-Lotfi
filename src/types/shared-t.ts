type IError = { [key: string]: string[] };

export type IState = {
  isSaved: boolean;
  message?: string;
  errors?: IError;
};
