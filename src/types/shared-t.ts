type IError = { [key: string]: string[] }
export type IState = { isSaved: boolean; message?: string; errors?: IError }

type ExtractRouteParams<T extends string> =
  T extends `${string}/[${infer Param}]${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : Record<never, never>

export type RouteContext<T extends string> = {
  params: Promise<ExtractRouteParams<T>>
}
