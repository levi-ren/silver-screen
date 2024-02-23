import LinkIcon from "@/icons/link-icon";
import StarIcon from "@/icons/star-icon";
import { MovieReviews } from "@/types/movie-details";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import ReviewsLoader from "./reviews-loader";

function timePassedSince(dateString: string) {
  // Parse the input date string
  const startDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate.getTime() - startDate.getTime();

  // Convert the difference from milliseconds to seconds
  const secondsDifference = timeDifference / 1000;

  let message = "";

  // Define time units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30.44; // Approximate number of days in a month
  const year = day * 365.25; // Approximate number of days in a year

  // Calculate time difference in various units
  const yearsDifference = Math.floor(secondsDifference / year);
  const monthsDifference = Math.floor(secondsDifference / month);
  const weeksDifference = Math.floor(secondsDifference / week);
  const daysDifference = Math.floor(secondsDifference / day);
  const hoursDifference = Math.floor(secondsDifference / hour);
  const minutesDifference = Math.floor(secondsDifference / minute);

  if (yearsDifference > 0) {
    message += yearsDifference + " year(s) ";
  } else if (monthsDifference > 0) {
    message += monthsDifference + " month(s) ";
  } else if (weeksDifference > 0) {
    message += weeksDifference + " week(s) ";
  } else if (daysDifference > 0) {
    message += daysDifference + " day(s) ";
  } else if (hoursDifference > 0) {
    message += hoursDifference + " hour(s) ";
  } else if (minutesDifference > 0) {
    message += minutesDifference + " minute(s) ";
  }

  if (message === "") {
    message = "Just now";
  } else {
    message += "ago";
  }

  return message;
}

const peerNames = [
  "peer/one",
  "peer/two",
  "peer/three",
  "peer/four",
  "peer/five",
];
const peerStyles = [
  "peer-checked/one:line-clamp-none",
  "peer-checked/two:line-clamp-none",
  "peer-checked/three:line-clamp-none",
  "peer-checked/four:line-clamp-none",
  "peer-checked/five:line-clamp-none",
];
const maxLength = 1200;

const styleRating = (rating?: number) => {
  if (!rating) return "text-white/70 border-white/20";
  switch (true) {
    case rating < 2.5:
      return "text-red-500 border-red-500/50";
    case rating < 5.5:
      return "text-orange-500 border-orange-500/50";
    case rating < 7.5:
      return "text-yellow-500 border-yellow-500/50";
    default:
      return "text-green-500 border-green-500/50";
  }
};

interface ContentProps {
  content: string;
  htmlFor: string;
  index: number;
}

async function Content({ content, htmlFor, index }: ContentProps) {
  const markedContent = await marked(content, { async: true });
  return (
    <label
      htmlFor={htmlFor}
      className={`${peerStyles[index]} space-y-3 text-ellipsis line-clamp-6 px-2 xs:px-6 cursor-pointer `}
      dangerouslySetInnerHTML={{
        __html: markedContent,
      }}
    />
  );
}

interface ReviewsProps {
  reviews: MovieReviews;
}

export default async function Reviews({ reviews }: ReviewsProps) {
  return (
    <article id="reviews" className="flex-1 basis-2/3 ">
      <div className="flex justify-between items-center">
        <div className="">
          <span className="text-4xl font-bebas font-semibold small-caps">
            Reviews{" "}
          </span>
          <span className="text-base tracking-tighter align-super">
            ({reviews.total_results})
          </span>
        </div>
        {reviews.results.length > 5 && (
          <Link href="#reviews">
            <LinkIcon className="w-5 h-5" />
          </Link>
        )}
      </div>
      {reviews.total_results === 0 ? (
        <div className="w-full rounded-md border border-white/20 px-4 py-28 mt-4 text-center">
          No reviews yet
        </div>
      ) : (
        <ul className="space-y-2 py-4">
          {reviews.results.slice(0, 5).map((review, i) => (
            <li
              className={twMerge(
                "border border-white/20 rounded-md p-2 tracking-tighter text-justify relative pb-7 bg-zinc-950",
                review.content.length > maxLength && "pb-14"
              )}
              key={review.id}
            >
              <div className="pt-4 pb-6 border-b border-white/20 mb-6 px-2 xs:px-4 ">
                <div className="flex gap-x-2">
                  <div className="w-[45px] h-[45px] bg-white rounded-full uppercase flex justify-center items-center shrink-0">
                    {review.author_details.avatar_path ? (
                      <Image
                        draggable={false}
                        src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                        alt={review.author}
                        className="h-full select-none rounded-full object-cover  border-2"
                        width={45}
                        height={45}
                        loading="lazy"
                      />
                    ) : (
                      <span className="tracking-normal font-bebas text-xl text-black">
                        {(review.author_details.name
                          ? review.author_details.name
                          : review.author_details.username
                        )
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="">{review.author}</p>
                    <p className="text-xs text-white/90">
                      Written {timePassedSince(review.created_at)}
                    </p>
                  </div>

                  <div
                    className={twMerge(
                      "ml-auto text-3xl font-bebas self-center w-10 h-10 border border-dashed rounded-full items-center justify-center flex gap-x-[1px] p-1 ",
                      styleRating(review.author_details.rating)
                    )}
                  >
                    <span className="h-8">
                      {review.author_details.rating || "~~"}
                    </span>
                    {review.author_details.rating && (
                      <StarIcon className="w-2.5 h-2.5 shrink-0 " />
                    )}
                  </div>
                </div>
              </div>

              <input
                id={review.id}
                type="checkbox"
                className={peerNames[i]}
                hidden
              />
              <Suspense fallback={<ReviewsLoader />}>
                <Content
                  content={review.content}
                  htmlFor={review.id}
                  index={i}
                />
              </Suspense>
            </li>
          ))}
        </ul>
      )}

      {reviews.results.length > 5 && (
        <div className="text-center">
          <Link href="#reviews">
            View All
            <LinkIcon className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      )}
    </article>
  );
}
