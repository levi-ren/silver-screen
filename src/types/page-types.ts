export type PageProps<T = undefined> = {
  params: { [x: string]: string };
  // searchParams: {
  //   [x: string]: T extends undefined ? string | undefined : T;
  // };
  searchParams: T extends undefined ? { [x: string]: string | undefined } : T;
};

export type SearchPageParams = {
  query?: string;
  type?: "movie" | "tv" | "both";
  year?: string;
  page?: string;
};
