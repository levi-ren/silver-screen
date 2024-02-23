import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface AnchorProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  ["aria-label"]: string;
  children?: ReactNode;
  className?: string;
}

export default function Anchor({ children, ...props }: AnchorProps) {
  return <Link {...props}>{children}</Link>;
}
