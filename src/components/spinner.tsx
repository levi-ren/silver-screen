interface SpinnerProps {}

export default function Spinner(props: SpinnerProps) {
  return (
    <div className="w-9 h-9  rounded-full border-2 border-white border-b-black animate-spin" />
  );
}
