import Image from "next/image";

export default function BackgroundImage() {
  return (
    <Image
      className="brightness-[.2] object-cover -z-10 blur-[2px]"
      src="/banner-posters.webp"
      alt="Banner posters"
      fill
      priority
    />
  );
}
