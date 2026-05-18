export interface INav {
  title: string;
  slug: string;
}

export type IProps = { menu: INav[] };

export interface ISection {
  title: string;
  slug: string;
  description: string;
}
export interface INav {
  title: string;
  slug: string;
  children?: INav[];
}
