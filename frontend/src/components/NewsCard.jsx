import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NewsCard = ({ article }) => {
  const { title, publisher, link, providerPublishTime, thumbnail } = article;

  const imageUrl =
    thumbnail?.resolutions?.find(r => r.width >= 400)?.url ||
    thumbnail?.resolutions?.[0]?.url ||
    "https://via.placeholder.com/600x300?text=News";

  const timeAgo = providerPublishTime
    ? dayjs(providerPublishTime * 1000).fromNow() // FIX: convert seconds → ms
    : "";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full max-w-3xl rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow hover:shadow-lg transition"
    >
      {/* Top Image */}
      <div className="w-full h-48 md:h-35 overflow-hidden rounded-t-lg bg-gray-200 dark:bg-zinc-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Footer: Publisher & Time */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span className="font-medium truncate">{publisher || "Market News"}</span>
          <span className="whitespace-nowrap">{timeAgo}</span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
