export type PageProps<T = any> = {
  params: { [x: string]: string; region: string };
  searchParams: {
    [x: string]: T extends undefined ? string | string[] | undefined : T;
  };
};

export type SearchPageParams = {
  query: string;
  type: "movie" | "tv" | "both";
  year: string;
  page: string;
};
