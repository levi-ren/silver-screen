import Logo from "@/components/logo";
import GitHubIcon from "@/icons/github-icon";
import LDLogo from "@/icons/ld-logo";
import LinkedInIcon from "@/icons/linkedin-icon";
import Image from "next/image";
import Link from "next/link";

const quicklinks = [
  { label: "About", href: "/about" },
  { label: "Movies", href: "/search?type=movies" },
  { label: "TV-Shows", href: "/search?type=tv" },
  { label: "Trending", href: "/search?trending=all" },
  { label: "Upcoming", href: "/search?type=movies&upcoming=true" },
];
const socials = [
  { label: "Levi Deang", href: "https://www.levideang.dev", logo: LDLogo },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/levi-deang",
    logo: LinkedInIcon,
  },
  {
    label: "Github",
    href: "https://github.com/levi-ren/silver-screen",
    logo: GitHubIcon,
  },
];

interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <footer className="relative py-4 mt-10 pt-4">
      <Image
        className="grayscale object-cover -z-10 blur brightness-50"
        src="/banner-footer.jpg"
        alt="Banner posters"
        fill
        loading="lazy"
      />
      <div className="p-2">
        <div className="pb-8 border-b border-white/20 flex">
          <Logo className="text-center mx-auto" size="large" />
        </div>
        <div className="px-2 my-4 flex gap-2 text-sm max-w-2xl m-auto justify-between">
          <div className=" space-y-2">
            <p className="font-semibold tracking-tighter text-blue-500 text-base">
              Quick Links:
            </p>
            <ul className="space-y-2">
              {quicklinks.map((q) => (
                <li key={q.label}>
                  <Link href={q.href}>{q.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" space-y-2">
            <p className="font-semibold tracking-tighter text-blue-500 text-base">
              Socials:
            </p>

            <ul className="space-y-2">
              {socials.map((q) => (
                <li key={q.label}>
                  <Link
                    className="inline-flex items-center gap-x-2"
                    target="_blank"
                    href={q.href}
                  >
                    <q.logo className="w-7 h-7" />
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center text-balance italic text-sm font-thin leading-tight tracking-tighter py-2">
          This site does not collect, store and distribute data, this site only
          provides visual displays of media hosted on 3rd party services.
        </p>
        <div className="text-sm text-center pt-4 border-t border-blue-400/50">
          <p>Powered by:</p>
          <Link
            href="https://www.themoviedb.org"
            target="_blank"
            className="inline-flex"
          >
            <Image
              draggable={false}
              src="./tmdb_logo.svg"
              alt="TMDB Logo"
              className="m-auto"
              width={150}
              height={21}
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
