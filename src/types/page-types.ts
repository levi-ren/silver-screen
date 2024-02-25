export type PageProps<T = any> = {
  params: { [x: string]: string; region: string };
  searchParams: {
    [x: string]: T extends undefined ? string | string[] | undefined : T;
  };
};
