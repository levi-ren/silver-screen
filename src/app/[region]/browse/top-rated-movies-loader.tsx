export default function TopRatedMoviesLoader() {
  return (
    <section
      id="top-rated-movies"
      className="p-2 md:p-4 space-y-4 bg-zinc-950 mt-4 col-span-12 order-7"
    >
      <p className="text-4xl font-bebas font-semibold small-caps">
        Top Rated Movies
      </p>
      <div className="gap-x-8 space-y-4 px-4 md:columns-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="relative rounded-xl bg-zinc-900 h-[83px] animate-pulse"
            key={i}
          >
            <p className="md:w-10 md:h-10 w-8 h-8 flex shrink-0 items-center justify-center border-2 bg-black/90 text-blue-500/90 border-blue-500/70 text-xl font-bebas rounded-full absolute top-1/2 z-10 -translate-y-1/2 -left-4 md:-left-5">
              {i + 1}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
