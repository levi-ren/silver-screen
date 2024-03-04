"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countries } from "@/constants/countries";
import EarthIcon from "@/icons/earth-icon";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Content = ({ onSelect }: { onSelect: (e: boolean) => void }) => {
  const router = useRouter();
  const groupRef = useRef<HTMLDivElement>(null);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const virtualizer = useVirtualizer({
    count: filteredCountries.length,
    getScrollElement: () => groupRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    const e = countries.filter((country) =>
      country.english_name.toLowerCase().includes(search.toLowerCase() ?? [])
    );
    setFilteredCountries(e);
  };
  return (
    <PopoverContent className=" p-0 mx-2">
      <Command shouldFilter={false}>
        <CommandInput
          onValueChange={handleSearch}
          placeholder="Search country..."
          className="h-9"
        />
        <CommandEmpty>Unsupported country.</CommandEmpty>
        <CommandGroup className="max-h-96 overflow-y-auto" ref={groupRef}>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualOptions.map((virtualOption) => (
              <CommandItem
                title={filteredCountries[virtualOption.index].english_name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 999,
                  width: "100%",
                  height: `${virtualOption.size}px`,
                  transform: `translateY(${virtualOption.start}px)`,
                }}
                key={filteredCountries[virtualOption.index].iso_3166_1}
                value={filteredCountries[virtualOption.index].english_name}
                onSelect={() => {
                  router.push(
                    `/browse?country=${
                      filteredCountries[virtualOption.index].iso_3166_1
                    }`
                  );
                  onSelect(false);
                }}
                className="flex gap-x-4 items-center"
              >
                <Image
                  draggable={false}
                  src={`https://flagcdn.com/16x12/${filteredCountries[
                    virtualOption.index
                  ].iso_3166_1.toLowerCase()}.webp`}
                  alt={`${
                    filteredCountries[virtualOption.index].english_name
                  } flag`}
                  width={16}
                  height={12}
                  loading="lazy"
                  className="shrink-0"
                />
                <p className="truncate">
                  {filteredCountries[virtualOption.index].english_name}
                </p>
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      </Command>
    </PopoverContent>
  );
};

export function CountryList() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);

  const close = (e: boolean) => {
    setOpen(e);
    if (e) {
      setLoad(e);
    } else {
      setTimeout(() => {
        setLoad(e);
      }, 150);
    }
  };

  return (
    <Popover open={open} onOpenChange={close}>
      <PopoverTrigger asChild className="cursor-pointer">
        <EarthIcon className="text-white/80 transition-colors hover:text-white" />
      </PopoverTrigger>
      {load && <Content onSelect={close} />}
    </Popover>
  );
}
