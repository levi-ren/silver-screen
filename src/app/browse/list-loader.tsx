export default async function ListLoader({ header }: { header: string }) {
  return (
    <section id="trending" className="p-2 pb-0 md:pb-0 md:p-4 space-y-4 ">
      <p className="text-4xl font-semibold font-bebas small-caps">{header}</p>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="inline-block h-full select-none w-[175px] aspect-[2/3]  rounded-md border border-white/20 animate-pulse bg-white/50"
          />
        ))}
      </div>
    </section>
  );
}
