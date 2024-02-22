import ChevronIcon from "@/icons/chevron-icon";
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

  // Convert the difference from milliseconds to days, hours, and minutes
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 3600)) / (1000 * 60)
  );

  let message = "";

  if (daysDifference > 0) {
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

interface ReviewsProps {
  reviews: MovieReviews;
}

const styles1 = [
  "peer/one",
  "peer/two",
  "peer/three",
  "peer/four",
  "peer/five",
];
const styles2 = [
  "peer-has-[:checked]/one:line-clamp-none",
  "peer-has-[:checked]/two:line-clamp-none",
  "peer-has-[:checked]/three:line-clamp-none",
  "peer-has-[:checked]/four:line-clamp-none",
  "peer-has-[:checked]/five:line-clamp-none",
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
  index: number;
}

async function Content({ content, index }: ContentProps) {
  const markedContent = await marked(content, { async: true });
  return (
    <div
      className={`${styles2[index]} space-y-3 overflow-hidden text-ellipsis line-clamp-6 px-2 xs:px-6`}
      dangerouslySetInnerHTML={{
        __html: markedContent,
      }}
    />
  );
}

export default async function Reviews({ reviews }: ReviewsProps) {
  return (
    <section id="reviews" className=" pt-6 md:pt-6 md:p-4">
      <div className="max-w-screen-xl m-auto px-2 sm:px-4">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bebas font-semibold small-caps">
            Reviews
          </p>
          <Link href="#reviews">
            <LinkIcon className="w-5 h-5" />
          </Link>
        </div>
        <ul className="space-y-2 py-4">
          {reviews.results.slice(0, 5).map((review, i) => (
            <li
              className={twMerge(
                "border border-white/20 rounded-md p-2 tracking-tighter text-justify relative pb-7",
                review.content.length > maxLength && "pb-14"
              )}
              key={review.id}
            >
              <div className="pt-4 pb-6 border-b border-white/20 mb-6 px-2 xs:px-4">
                <div className="flex gap-x-2">
                  <div className="w-[45px] h-[45px] bg-zinc-900 rounded-full uppercase flex justify-center items-center shrink-0">
                    {review.author_details.avatar_path ? (
                      <Image
                        draggable={false}
                        src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                        alt={review.author}
                        className="h-full select-none rounded-full object-cover border-white border-2"
                        width={45}
                        height={45}
                        loading="lazy"
                      />
                    ) : (
                      <span className="tracking-normal font-bebas text-xl">
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
                      "ml-auto text-3xl font-bebas self-center w-10 h-10 border border-dashed rounded-full items-center justify-center flex gap-x-1 p-1",
                      styleRating(review.author_details.rating)
                    )}
                  >
                    {review.author_details.rating || "~~"}
                    {review.author_details.rating && (
                      <StarIcon className="w-2.5 h-2.5 shrink-0 " />
                    )}
                  </div>
                </div>
              </div>

              {review.content.length > maxLength && (
                <label
                  className={`${styles1[i]} m-auto absolute bottom-4  right-1/2 translate-x-1/2 rounded-full cursor-pointer group`}
                  htmlFor={review.id}
                >
                  <input id={review.id} type="checkbox" hidden />
                  <ChevronIcon className="h-6 w-6 group-has-[:checked]:rotate-180" />
                </label>
              )}
              <Suspense fallback={<ReviewsLoader />}>
                <Content content={review.content} index={i} />
              </Suspense>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
