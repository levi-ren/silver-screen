export default  function FilterResultsLoader() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-4 place-items-center">
      {Array.from({ length: 40 }).map((_, o) => {
        return (
          <div className="relative max-w-[200px] w-full aspect-[2/3]" key={o}>
            <div className="w-full aspect-[2/3] rounded-md border border-white/20 p-2 ">
              <div className="h-full bg-white/70 rounded italic text-sm flex items-center justify-center text-gray-700" />
            </div>
            <div className="my-2 space-y-2">
              <div className="text-xs flex justify-between items-center">
                <div className="w-6 h-3 animate-pulse rounded-md bg-white/70"></div>
                <div className="border h-4 w-10 border-white/20 rounded-full bg-blue-300/90" />
                <div className="w-6 h-3 animate-pulse rounded-md bg-white/70"></div>
              </div>
              <div className="h-4 w-32 m-auto animate-pulse rounded-md bg-white/70" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
