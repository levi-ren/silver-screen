import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface QuerySearchFormProps extends PropsWithChildren {
  className?: string;
}

export default function QuerySearchFormLoader({
  className,
  children,
}: QuerySearchFormProps) {
  return <form className={twMerge("cursor-wait", className)}>{children}</form>;
}
