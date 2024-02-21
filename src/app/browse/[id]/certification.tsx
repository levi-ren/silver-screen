import { MovieReleaseDates } from "@/types/movie-details";

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
  const certificate = certificates.results
    .find((r) => r.iso_3166_1 === country)
    ?.release_dates.find(
      (d) => new Date(d.release_date) >= new Date(release_date)
    );
  return certificate ? (
    <div className=" text-xl tracking-tighter font-bebas text-gray-400 divide-x divide-white/40">
      <span className="px-1">{certificate?.certification}</span>
      <span className="px-1">
        {new Date(certificate.release_date).toLocaleDateString()}
      </span>
      <span className="small-caps px-1">{convert(runtime)}</span>
    </div>
  ) : null;
}
