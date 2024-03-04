interface BrowseLinkLoaderProps {}

export default function BrowseLinkLoader(props: BrowseLinkLoaderProps) {
  return (
    <div
      aria-label="Link to browse"
      className="inline-block rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 mb-6 cursor-wait"
    >
      Browse Cataloge
    </div>
  );
}
