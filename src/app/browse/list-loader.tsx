import { twMerge } from "tailwind-merge";

interface ListLoaderProps {
  header: string;
  className?: string;
}

export default async function ListLoader({
  header,
  className,
}: ListLoaderProps) {
  return (
    <section
      id="trending"
      className={twMerge(
        "p-2 !pb-0 md:p-4 space-y-4  xl:col-span-8 order-3 col-span-12  xxl:col-span-9",
        className
      )}
    >
      <p className="text-4xl font-semibold font-bebas small-caps">{header}</p>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="inline-block select-none w-[175px] h-[262.5px]  rounded-md border border-white/20 animate-pulse bg-white/50"
          />
        ))}
      </div>
    </section>
  );
}
