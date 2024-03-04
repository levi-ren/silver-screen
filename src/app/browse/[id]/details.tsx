import { languages } from "@/constants/languages";
import { MovieDetails } from "@/types/movie-details";
import { TVDetails } from "@/types/tv-details";
import Image from "next/image";
import Certification from "./certification";
import TVContentRating from "./content-rating";

const moneyFormat = (n: number) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(n);

interface DetailsProps {
  resource: MovieDetails | TVDetails;
  country?: string;
}

export default function Details({ resource, country }: DetailsProps) {
  const isMovie = "title" in resource;
  return (
    <section id="details" className="relative p-2 md:p-4">
      <div className="absolute inset-0 -top-[103px] w-fullh-[calc(100%_+_103px)]">
        {resource.backdrop_path && (
          <Image
            draggable={false}
            src={`https://image.tmdb.org/t/p/w1280${resource.backdrop_path}`}
            alt={isMovie ? resource.title : resource.name}
            className="select-none blur-[2px] grayscale brightness-50 object-cover"
            fill
            priority
          />
        )}
      </div>
      <div className="max-w-screen-xl m-auto relative z-10">
        <div className="p-2 md:p-4 flex h-full gap-x-4 flex-col sm:flex-row justify-center">
          {resource.poster_path ? (
            <div className="self-center sm:self-start space-y-2  shrink-0 w-full sm:w-fit">
              <Image
                draggable={false}
                src={`https://image.tmdb.org/t/p/w342${resource.poster_path}`}
                alt={isMovie ? resource.title : resource.name}
                className="select-none rounded-md  min-w-0 sm:w-[230px] sm:h-[345px] md:w-[342px] md:h-[513px] m-auto"
                width={342}
                height={513}
                priority
              />
              {isMovie ? (
                <Certification
                  certificates={resource.release_dates}
                  release_date={resource.release_date}
                  country={country}
                  runtime={resource.runtime}
                  className="text-center !text-white  border border-dashed border-white/20 p-2 bg-black/50 rounded-md "
                />
              ) : (
                <TVContentRating
                  country={country}
                  seasons={`${resource.number_of_seasons} season${
                    resource.number_of_seasons > 1 ? "s" : ""
                  }`}
                  episodes={`${resource.number_of_episodes} episodes`}
                  ratings={resource.content_ratings.results}
                  className="text-center !text-white  border border-dashed border-white/20 p-2 bg-black/50 rounded-md max-w-xl"
                />
              )}
            </div>
          ) : (
            <div className="self-center w-[342px] h-[513px] min-w-0 sm:w-[230px] sm:h-[345px] md:w-[342px] md:h-[513px] rounded-md border border-white/20 p-2 sm:self-start">
              <div className="bg-black/80 h-full rounded grid place-items-center text-sm italic font-extralight">
                No poster available
              </div>
            </div>
          )}

          <div className="max-w-xl py-2">
            {resource.tagline && (
              <p className="italic my-4 tracking-tighter text-blue-400 text-center text-balance max-w-xl">
                ~ {resource.tagline} ~
              </p>
            )}

            <div className="tracking-tighter leading-tight max-w-xl mt-4">
              <p className="font-semibold">Overview:</p>
              <p className="text-sm text-justify pl-2">{resource.overview}</p>
            </div>

            <div className="tracking-tighter leading-tight max-w-xl mt-4 pt-4 flex text-center sm:text-left border-t border-white/20 gap-2">
              <div className="flex-1">
                <p className="font-semibold">
                  {isMovie ? "Director" : "Created by"}:
                </p>
                <p className="text-sm sm:text-justify sm:pl-2 hover:text-blue-500 transition-colors cursor-pointer">
                  {isMovie
                    ? resource.credits.crew.find(
                        (c) => c.job.toLowerCase() === "director"
                      )?.name
                    : resource.created_by.map((e) => e.name).join(" & ")}
                </p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Status:</p>
                <p className="text-sm sm:text-justify sm:pl-2">
                  {resource.status}
                </p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Language:</p>
                <p className="text-sm sm:text-justify sm:pl-2">
                  {languages[resource.original_language].english_name}
                </p>
              </div>
            </div>

            <div className="tracking-tighter leading-tight max-w-xl mt-8 flex text-center sm:text-left gap-2">
              <div className="flex-1 space-y-2 basis-1/3">
                <p className="font-semibold">
                  {isMovie ? "Buget" : "First air date"}:
                </p>
                <p className="text-sm sm:text-justify sm:pl-2">
                  {isMovie
                    ? moneyFormat(resource.budget)
                    : new Date(resource.first_air_date).toLocaleDateString()}
                </p>
                <p className="font-semibold">
                  {isMovie ? "Revenue" : "Last air date"}:
                </p>
                <p className="text-sm sm:text-justify sm:pl-2">
                  {isMovie
                    ? moneyFormat(resource.revenue)
                    : new Date(resource.last_air_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-1 basis-2/3">
                <p className="font-semibold">Key words:</p>
                <ul className="text-sm sm:text-justify space-x-2 space-y-1">
                  {(isMovie
                    ? resource.keywords.keywords
                    : resource.keywords.results
                  ).map((word) => (
                    <li
                      key={word.id}
                      className="px-2 inline-block border border-white/20 bg-black/50 rounded first-of-type:ml-2 hover:text-blue-500 transition-colors cursor-pointer hover:border-blue-500/50"
                    >
                      {word.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
