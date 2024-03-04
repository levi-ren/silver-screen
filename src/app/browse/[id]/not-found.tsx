import Back from "../../../components/back";

export default function NotFound() {
  return (
    <main className="w-screen h-screen flex justify-center items-center gap-x-8 p-2">
      <h2 className="text-7xl font-extrabold  [-webkit-text-stroke:1px_#be123c] font-bebas text-black shirnk-0">
        404
      </h2>
      <div className="border-r border-white/20 h-28" />
      <div className="space-y-4 font-thin tracking-tighter leading-none">
        <p>Could not find requested resource</p>
        <p>
          Click <Back>Here</Back> to go back
        </p>
      </div>
    </main>
  );
}
