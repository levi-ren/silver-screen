"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, PropsWithChildren } from "react";

interface QuerySearchFormProps extends PropsWithChildren {
  className?: string;
}

export default function QuerySearchForm({
  className,
  children,
}: QuerySearchFormProps) {
  const router = useRouter();
  const country = useSearchParams().get("country");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString();
    if (!query) return;

    const params = new URLSearchParams({
      query,
      ...(country ? { country } : {}),
      page: "1",
    });
    router.push(`/search?${params.toString()}`);
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
