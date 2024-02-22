import { MovieReleaseDates } from "@/types/movie-details";
import { twMerge } from "tailwind-merge";

interface CertificationProps {
  certificates: MovieReleaseDates;
  release_date: string;
  country: string;
  runtime: number;
}

const convert = (n: number) => {
  const hours = Math.floor(n / 60);
  const minutes = n % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export default function Certification({
  certificates,
  country,
  release_date,
  runtime,
}: CertificationProps) {
  const certificate = (
    certificates.results.find((r) => r.iso_3166_1 === country) ||
    certificates.results.find((r) => r.iso_3166_1 === "US")
  )?.release_dates.find(
    (d) => new Date(d.release_date) >= new Date(release_date)
  );
  const countryRelease = certificates.results.find(
    (r) => r.iso_3166_1 === country
  )
    ? country
    : "US";
  return certificate ? (
    <div className=" text-xl tracking-tighter font-bebas text-gray-400 divide-x divide-white/40">
      <div className="inline pr-1">
        <span
          className={twMerge(
            "px-1 border border-white/20",
            !certificate?.certification && "text-red-500 border-none"
          )}
        >
          {certificate?.certification || "Unrated"}
        </span>
        {certificate?.certification && country !== countryRelease && (
          <span className="pl-1">({countryRelease})</span>
        )}
      </div>
      <span className="px-1">
        {new Date(certificate.release_date).toLocaleDateString()}
      </span>
      <span className="small-caps px-1">{convert(runtime)}</span>
    </div>
  ) : null;
}
