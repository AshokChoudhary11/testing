"use client";
import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import "./page.css";
import Loading from "@/components/Loading";
import { Search } from "react-feather";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]); // Store all posts
  const [posts, setPosts] = useState([]); // Store filtered posts
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    if (event) event.preventDefault(); // Prevent form submission
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      const filteredPosts = allPosts.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(term)) ||
          (post.description && post.description.toLowerCase().includes(term))
      );
      setPosts(filteredPosts);
    } else {
      setPosts(allPosts); // Show all posts if search term is empty
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setAllPosts(data); // Store all posts
        setPosts(data); // Initially display all posts
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      <form onSubmit={handleSearch} className="searchForm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="searchInput"
        />
        <button type="submit" className="searchButton">
          <Search />
        </button>
      </form>
      <div className="container">
        {loading ? <Loading /> : <BlogList posts={posts} />}
      </div>
    </>
  );
}
