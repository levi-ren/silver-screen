export default function TopTenLoader() {
  return (
    <section
      id="top-10"
      className="px-2 py-4 bg-zinc-950 mt-4 col-span-12 order-4"
    >
      <p className="text-4xl font-bebas font-semibold small-caps">
        Top Ten Shows
      </p>
      <div className="overflow-x-auto overflow-y-hidden h-full hidden-scrollbar hover:display-scrollbar pb-4  space-x-2 whitespace-nowrap">
        {Array.from({ length: 10 }).map((t, i) => (
          <div key={i} className="inline-block whitespace-nowrap min-w-max">
            <p className="md:text-[25rem] text-black font-extrabold leading-none [-webkit-text-stroke:12px_gray] font-sans inline-block tracking-tighter text-[20rem]">
              {i + 1}
            </p>

            <div className="inline-block border border-white/20 animate-pulse bg-white/50  aspect-[2/3] select-none md:w-[250px] w-[175px]  rounded-xl relative md:-left-15 md:top-10 -left-10 top-5" />
          </div>
        ))}
      </div>
    </section>
  );
}
