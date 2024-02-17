import { RequestInit } from "next/dist/server/web/spec-extension/request";
const BASE_URL = "https://api.themoviedb.org";
export const tmdbFetch = (
  url: string,
  params?: Record<string, string>,
  options?: RequestInit
) => {
  const resource = new URL(`/3/${url}`, BASE_URL);
  if (params) {
    resource.search = new URLSearchParams(params).toString();
  }

  return fetch(resource, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      ...options?.headers,
    },
    ...options,
  });
};
