import Spinner from "@/components/spinner";

interface WatchLoadingProps {}

export default function WatchLoading(props: WatchLoadingProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
