import Anchor from "@/components/anchor";
import BackgroundImage from "@/components/background-image";
import QuerySearchForm from "@/components/query-search-form";
import { allowedLocales } from "@/constants/countries";
import SearchIcon from "@/icons/search-icon";
import { PageProps } from "@/types/page-types";

export async function generateStaticParams() {
  return allowedLocales.map((locale) => ({ region: locale }));
}

export default function About({ params: { region } }: PageProps) {
  return (
    <main className="relative">
      <BackgroundImage />

      <section className="flex flex-col justify-center items-center min-h-screen max-w-screen-md m-auto p-4">
        <h1 className="text-4xl font-bebas font-semibold small-caps my-6">
          About
        </h1>
        <div className="space-y-4 text-justify *:p-4 *:rounded-md *:border *:border-white/20 *:bg-black/90 *:shadow-xl ">
          <div>
            At Silver Screen, I&apos;m committed to providing you with an
            unparalleled streaming experience that&apos;s both seamless and
            entirely free. The platform is designed to be your ultimate
            destination for discovering and enjoying a vast array of movies and
            TV shows, all without any subscription fees or hidden costs.
          </div>

          <div>
            I believe that access to great content should be universal, which is
            why I&apos;ve partnered with{" "}
            <Anchor
              aria-label="Link to TMDB"
              href="https://www.themoviedb.org"
              target="_blank"
              className="text-[#01b4e4]"
            >
              TMDB
            </Anchor>{" "}
            to enrich your streaming experience with comprehensive insights and
            details about your favorite movies and TV shows. From cast and crew
            information to box office revenue and critical reviews, the platform
            offers a wealth of knowledge to enhance your viewing experience.
          </div>

          <div>
            Powered by cutting-edge streaming technology, the platform brings
            the magic of cinema directly to your screen, allowing you to watch
            your favorite titles anytime, anywhere.
            <p className="mt-4">
              While I strive to offer a premium viewing experience, it&apos;s
              important to note that the video streaming functionality is
              facilitated through a third-party library over which I don&apos;t
              have control. I want to emphasize that I don&apos;t receive any
              form of payment or incentive from the ads displayed. These ads are
              solely managed by the third-party library and are not utilized to
              cover any costs associated with maintaining or improving the
              platform. They are simply a part of the third-party&apos;s
              advertising model.
            </p>
          </div>

          <div>
            At Silver Screen, my mission is simple: to elevate your
            entertainment experience while providing you with the freedom to
            explore and enjoy a diverse range of content, all at your
            fingertips. Join me today and immerse yourself in a world of
            cinematic wonders, where every click brings you closer to the magic
            of the cinema.
          </div>
        </div>

        <QuerySearchForm className="w-full mt-6" region={region}>
          <div className="flex gap-x-2 items-center rounded-full px-4 py-2 bg-black/90 border border-white/20">
            <input
              className="w-full placeholder:text-sm bg-transparent outline-none"
              placeholder="Search movies"
              name="query"
              id="query"
            />
            <SearchIcon className="text-white/50 " />
          </div>
        </QuerySearchForm>

        <span className="block my-2 italic text-sm text-gray-300">~ or ~</span>
        <Anchor
          aria-label="Link to browse"
          href={`/${region}/browse`}
          className="inline-block rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 mb-6"
        >
          Start your journey here
        </Anchor>
      </section>
    </main>
  );
}
