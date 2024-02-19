"use client";

import { FeaturedMovie } from "@/app/browse/featured-movie";
import { TrendingResults } from "@/types/shared";
import { Transition } from "@headlessui/react";
import {
  Fragment,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
} from "react";

interface CarouselProps {
  featured: TrendingResults[];
}
const minSwipeDistance = 50;
const Carousel = ({ featured }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p === 2 ? 0 : p + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.clientX);
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) =>
    setTouchEnd(e.clientX);

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    setIndex((p) => {
      if (p === 0) {
        if (isLeftSwipe) return p + 1;
        if (isRightSwipe) return p + 2;
      }
      if (p === 2) {
        if (isLeftSwipe) return p - 2;
        if (isRightSwipe) return p - 1;
      }

      if (isLeftSwipe) return p + 1;
      if (isRightSwipe) return p - 1;

      return p;
    });
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    setIndex((p) => {
      if (p === 0) {
        if (isLeftSwipe) return p + 1;
        if (isRightSwipe) return p + 2;
      }
      if (p === 2) {
        if (isLeftSwipe) return p - 2;
        if (isRightSwipe) return p - 1;
      }

      if (isLeftSwipe) return p + 1;
      if (isRightSwipe) return p - 1;

      return p;
    });
  };

  return (
    <section
      id="featured"
      className="relative aspect-[4/2.7] md:aspect-[16/7.4] lg:aspect-[16/8] max-h-[722px] w-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {featured.map((resource, i) => (
        <Transition
          show={index === i}
          key={resource.id}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-1"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-1"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div className="absolute w-full">
            <FeaturedMovie resource={resource} />
          </div>
        </Transition>
      ))}
    </section>
  );
};

export default Carousel;
