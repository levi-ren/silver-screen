interface ReviewsLoaderProps {}

export default function ReviewsLoader(props: ReviewsLoaderProps) {
  return (
    <div className="space-y-3 px-2 xs:px-6">
      <div className="bg-white/50 animate-pulse rounded-md h-3" />
      <div className="bg-white/50 animate-pulse rounded-md h-3" />
      <div className="bg-white/50 animate-pulse rounded-md h-3" />
    </div>
  );
}
