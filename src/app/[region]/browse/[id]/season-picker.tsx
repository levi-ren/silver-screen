"use client";

import Anchor from "@/components/anchor";
import { Command, CommandGroup } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollectionIcon from "@/icons/collection-icon";
import { TVSeasons } from "@/types/tv-details";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SeasonPickerProps {
  season: TVSeasons[];
  lastEpisode: number;
  lastSeason: number;
  seasonNumber: string;
  episodeNumber: string;
}

export default function SeasonPicker({
  season,
  lastEpisode,
  lastSeason,
  seasonNumber,
  episodeNumber,
}: SeasonPickerProps) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const queries = useSearchParams();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={twMerge(
          "cursor-pointer absolute right-4 z-20 top-2 opacity-10 lg:opacity-0 group-hover:opacity-100 peer-hover:opacity-100 transition-opacity",
          open && "opacity-100"
        )}
      >
        <div>
          <CollectionIcon className="w-5 h-5 text-white/70 transition-colors hover:text-white m-auto" />
          <p className="text-xs">
            S{seasonNumber} EP{episodeNumber}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent className=" p-0 mx-2">
        <Command shouldFilter={false}>
          <CommandGroup className="">
            <Tabs
              defaultValue={
                season.find((s) => s.season_number.toString() === seasonNumber)
                  ?.name || season[0].name
              }
              className="overflow-hidden"
            >
              <TabsList className="overflow-x-auto max-w-sm  block whitespace-nowrap overflow-y-hidden  no-scrollbar-height h-full hidden-scrollbar py-1">
                {season.map((season) => {
                  if (season.name.toLowerCase().includes("specials"))
                    return null;
                  return (
                    <TabsTrigger key={season.id} value={season.name}>
                      {season.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {season.map((season) => {
                if (season.name.toLowerCase().includes("specials")) return null;
                return (
                  <TabsContent
                    key={season.id}
                    value={season.name}
                    className="space-y-2 max-h-52 overflow-y-auto"
                  >
                    {Array.from({ length: season.episode_count }).map(
                      (_, i) => {
                        const q = new URLSearchParams(queries);
                        q.set("season", `${season.season_number}`);
                        q.set("episode", `${i + 1}`);

                        return lastEpisode < i + 1 &&
                          season.season_number === lastSeason ? (
                          <div
                            className="px-2 text-gray-500 italic py-1 rounded-md select-none"
                            key={i}
                          >
                            Episode {i + 1}
                          </div>
                        ) : (
                          <Anchor
                            href={`${pathName}?${q.toString()}`}
                            key={i}
                            aria-label={`Link to ${season.name} episode ${
                              i + 1
                            }`}
                            onClick={() => {
                              setOpen(false);
                            }}
                            className={twMerge(
                              "block px-2 transition-colors hover:bg-zinc-800 py-1 rounded-md",
                              seasonNumber ===
                                season.season_number.toString() &&
                                episodeNumber === (i + 1).toString() &&
                                "bg-zinc-800"
                            )}
                          >
                            Episode {i + 1}
                          </Anchor>
                        );
                      }
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
