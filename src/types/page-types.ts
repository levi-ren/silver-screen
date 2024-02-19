export type PageProps<T> = {
  params: { [x: string]: string };
  searchParams: {
    [x: string]: T extends undefined ? string | string[] | undefined : T;
  };
};
