export interface INav {
  title: string;
  slug: string;
  children?: INav[];
  role?: "user" | "administrator";
}

export type IProps = { menu: INav[] };

export interface ISection {
  title: string;
  slug: string;
  description: string;
}
