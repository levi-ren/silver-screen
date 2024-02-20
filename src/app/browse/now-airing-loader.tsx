export default async function NowAiringLoader() {
  return (
    <section
      id="now-airing"
      className="p-2 pb-0 md:pb-0 md:p-4 space-y-4 xl:col-span-4 col-span-12  xl:order-2 xl:row-span-2 xxl:col-span-3 order-5"
    >
      <div className="border rounded-xl border-white/20 p-4">
        <p className="text-4xl  font-semibold small-caps font-bebas xl:pb-4">
          Airing Today
        </p>
        <div className="space-y-4 xl:overflow-y-auto xl:overflow-x-hidden overflow-x-auto overflow-y-hidden xl:py-4 hidden-scrollbar hover:display-scrollbar xl:pr-4 max-h-[655px] whitespace-nowrap xl:whitespace-normal space-x-4 xl:space-x-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className="inline-block xl:block bg-white/50 animate-pulse rounded-md p-2 w-[275px] xl:w-full h-[148px] "
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
