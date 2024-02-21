import Logo from "@/components/logo";
import GitHubIcon from "@/icons/github-icon";
import LDLogo from "@/icons/ld-logo";
import LinkedInIcon from "@/icons/linkedin-icon";
import SearchIcon from "@/icons/search-icon";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Featured from "./featured";
import FeaturedLoading from "./featured-loading";
import ListLoader from "./list-loader";
import NowAiring from "./now-airing";
import NowAiringLoader from "./now-airing-loader";
import NowShowing from "./now-showing";
import TopRatedMoviesLoader from "./top-rate-movies-loader";
import TopRatedMovies from "./top-rated-movies";
import TopTen from "./top-ten";
import TopTenLoader from "./top-ten-loader";
import Trending from "./trending";

export default async function BrowsePage() {
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b relative flex items-center justify-between gap-x-2">
        <Logo />

        <form className="inline-flex-1 group ">
          <div className="flex  items-center rounded-full px-3 py-2 bg-black/90">
            <SearchIcon className="text-white w-4 h-4 m-auto focus:ml-auto relative right-0 shrink-0" />
            <input
              className="transition-all md:group-hover:w-[320px] md:[&:not(:placeholder-shown)]:w-[320px] md:focus:[&:placeholder-shown]:w-[320px] group-hover:w-[150px] placeholder:text-sm bg-transparent outline-none [&:not(:placeholder-shown)]:w-[150px] [&:placeholder-shown]:w-0 focus:[&:placeholder-shown]:w-[150px] focus:ml-2 group-hover:ml-2 [&:not(:placeholder-shown)]:ml-2"
              placeholder="Search movies"
            />
          </div>
        </form>
      </header>
      <main className="grid grid-cols-12">
        <Suspense fallback={<FeaturedLoading />}>
          <Featured />
        </Suspense>
        <Suspense
          fallback={<ListLoader header="Trending Today" className="order-2" />}
        >
          <Trending />
        </Suspense>
        <Suspense fallback={<NowAiringLoader />}>
          <NowAiring />
        </Suspense>
        <Suspense
          fallback={<ListLoader header="Only on Cinemas" className="order-3" />}
        >
          <NowShowing />
        </Suspense>
        <Suspense fallback={<TopTenLoader />}>
          <TopTen />
        </Suspense>

        <Suspense fallback={<TopRatedMoviesLoader />}>
          <TopRatedMovies />
        </Suspense>
      </main>
      <footer className="relative py-4 mt-10 pt-4">
        <Image
          className="grayscale object-cover -z-10 blur-[3px] brightness-50"
          src="/banner-posters.jpg"
          alt="Banner posters"
          fill
          priority
        />
        <div className="p-2">
          <div className="pb-8 border-b border-white/20 flex">
            <Logo className="text-center mx-auto" size="large" />
          </div>
          <div className="px-2 my-4 flex gap-2 text-sm">
            <div className="flex-1 space-y-2">
              <p className="font-semibold tracking-tighter text-blue-500 text-base">
                Quick Links:
              </p>
              <Link className="block" href="/about">
                About
              </Link>
              <Link className="block" href="/search?type=movies">
                Movies
              </Link>
              <Link className="block" href="/search?type=tv">
                TV-Shows
              </Link>
              <Link className="block" href="/search?trending=all">
                Trending
              </Link>
              <Link className="block" href="/search?type=movies&upcoming=true">
                Upcoming
              </Link>
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-semibold tracking-tighter text-blue-500 text-base">
                Socials:
              </p>
              <Link
                className="flex items-center gap-x-2"
                href="https://www.levideang.dev"
                target="_blank"
              >
                <LDLogo width={28} height={28} />
                <span>Levi Deang</span>
              </Link>
              <Link
                className="flex items-center gap-x-2"
                href="https://www.linkedin.com/in/levi-deang"
                target="_blank"
              >
                <LinkedInIcon className="w-7 h-7" />
                <span>LinkedIn</span>
              </Link>
              <Link
                className="flex items-center gap-x-2"
                href="https://github.com/levi-ren/silver-screen"
                target="_blank"
              >
                <GitHubIcon className="w-7 h-7" />
                <span>Github</span>
              </Link>
            </div>
          </div>
          <p className="text-center text-balance italic text-sm font-thin leading-tight tracking-tighter py-2">
            This site does not collect, store and distribute data, this site
            only provides visual displays of media hosted on 3rd party services.
          </p>
          <div className="text-sm text-center pt-4 border-t border-blue-400/50">
            <p>Powered by:</p>
            <Link href="https://www.themoviedb.org" target="_blank">
              <Image
                draggable={false}
                src="./tmdb_logo.svg"
                alt="TMDB Logo"
                className="m-auto"
                width={150}
                height={21}
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
