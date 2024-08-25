// src/app/search/page.jsx
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(window.location.search).get("query");

  useEffect(() => {
    if (query) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `/api/search?query=${encodeURIComponent(query)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setError("Error fetching search results");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [query]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!posts.length) return <div>No results found</div>;

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image && <img src={post.image} alt={post.title} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
