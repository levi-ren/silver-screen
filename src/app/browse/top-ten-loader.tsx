export default function TopTenLoader() {
  return (
    <section id="top-10" className="px-2 py-4 bg-zinc-950 mt-4">
      <div className="overflow-x-auto overflow-y-hidden h-full hidden-scrollbar hover:display-scrollbar pb-4  space-x-2 whitespace-nowrap">
        {Array.from({ length: 10 }).map((t, i) => (
          <div key={i} className="inline-block whitespace-nowrap">
            <p className="text-[25rem] text-black font-extrabold leading-none [-webkit-text-stroke:12px_gray] font-sans inline-block">
              {i + 1}
            </p>

            <div className="inline-block w-[250px] aspect-[11/17]  rounded-xl relative -left-20 top-10 border border-white/20 animate-pulse bg-white/50" />
          </div>
        ))}
      </div>
    </section>
  );
}
