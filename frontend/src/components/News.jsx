import { useEffect, useState } from "react";
import AppSidebar from "../components/AppSidebar";
import NewsCard from "../components/NewsCard";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("http://localhost:5000/api/stocks/market");

        if (!res.ok) {
          throw new Error("Failed to fetch market news");
        }

        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load market news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex w-full bg-black">
      <AppSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-16 border-b border-gray-800 bg-black shadow-sm">
          <div className="flex h-full items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-white">
              Market News
            </h1>

            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-white">Live Updates</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center mt-12">
              <div className="w-7 h-7 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm mt-3">
                Loading market news...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-red-400 mt-12">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <NewsCard
                  key={article.uuid}
                  article={{
                    title: article.title,
                    publisher: article.publisher,
                    link: article.link,
                    providerPublishTime:
                      article.providerPublishTime * 1000, // 🔥 important
                    thumbnail: article.thumbnail,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default News;
