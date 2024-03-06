import BackgroundImage from "@/components/background-image";
import BrowseLink from "@/components/browse-link";
import BrowseLinkLoader from "@/components/browse-link-loader";
import Logo from "@/components/logo";
import LogoLoader from "@/components/logo-loader";
import QuerySearchForm from "@/components/query-search-form";
import QuerySearchFormLoader from "@/components/query-search-form-loader";
import SearchIcon from "@/icons/search-icon";
import { Suspense } from "react";

export const dynamic = "error";

const Input = () => (
  <div className="flex gap-x-2 items-center rounded-full px-4 py-2 bg-black/70">
    <input
      className="w-full placeholder:text-sm bg-transparent outline-none"
      placeholder="Search movies"
      name="query"
      id="query"
    />
    <SearchIcon className="text-white/50 " />
  </div>
);

export default function Home() {
  return (
    <main className="relative">
      <BackgroundImage />
      <section className="min-h-screen flex justify-center items-center">
        <div className=" border border-white/50 rounded-xl text-center backdrop-blur shadow-md from-black to-black/5 bg-gradient-to-b m-4 max-w-4xl pr-1">
          <Suspense fallback={<LogoLoader className="my-6" />}>
            <Logo className="my-6" />
          </Suspense>
          <p className="text-balance px-2 md:px-4 text-blue-400">
            ~ Elevating Entertainment, One Stream at a Time. ~
          </p>
          <Suspense
            fallback={
              <QuerySearchFormLoader className="mt-6 px-2 md:px-6">
                <Input />
              </QuerySearchFormLoader>
            }
          >
            <QuerySearchForm className="mt-6 px-2 md:px-6">
              <Input />
            </QuerySearchForm>
          </Suspense>
          <span className="block my-2 italic text-sm text-gray-300 font-thin">
            ~ or ~
          </span>
          <Suspense fallback={<BrowseLinkLoader />}>
            <BrowseLink />
          </Suspense>
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pl-4 pr-1 text-justify pb-6 md:px-6 font-thin">
            <div className="first-letter:text-2xl font-thin">
              Welcome to <h1 className="inline">Silver Screen</h1>, your
              ultimate destination for streaming movies and TV shows! Dive into
              a world of endless entertainment where every click opens up a
              universe of cinematic wonders. With a vast library of the latest
              blockbusters, timeless classics, and binge-worthy TV series, we
              bring the magic cinema directly to your fingertips.
            </div>
            <p>
              But we&apos;re more than just a streaming platform – we&apos;re
              your go-to source for all things cinematic. Want to know more
              about the cast of your favorite movie or TV show? Curious about
              box office revenue or critical reviews? Look no further. Our
              comprehensive knowledge provides you with in-depth details, from
              cast and crew information to revenue statistics and critical
              acclaim.
            </p>
            <p>
              Experience seamless streaming with our user-friendly interface,
              tailored to enhance your viewing pleasure. Whether you&apos;re a
              film buff, TV aficionado, or simply in need of a cinematic escape,
              Silver Screen is your trusted companion for endless entertainment.
            </p>
            <p>
              Join us today and embark on a journey through the captivating
              world of movies and TV shows, where every moment is a cinematic
              adventure waiting to unfold.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
