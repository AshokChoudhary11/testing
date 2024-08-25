"use client";
import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import "./page.css";
import Loading from "@/components/Loading";
import { Search } from "react-feather";

export default function Home() {
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     title: "The Experience of Shopping",
  //     description:
  //       "For many, shopping is more than just a transaction; it’s an experience. From walking through a bustling mall to scrolling through an online store, the act of shopping engages our senses and emotions. The tactile pleasure of feeling a fabric, the visual appeal of well-designed products, and even the social interactions we have while shopping all contribute to this experience.\n Shopping can also be a form of entertainment. Window shopping, exploring new trends, or visiting markets in different cities can be a way to unwind and enjoy free time. The rise of experiential retail—where stores focus on creating memorable in-store experiences—highlights this shift. From interactive displays to personalized customer service, retailers are keen to make shopping enjoyable and unique.",
  //     image: "/image8.svg",
  //   },
  //   {
  //     id: 2,
  //     title: "The Psychological Benefits",
  //     description:
  //       "Beyond the tangible products we buy, shopping has psychological benefits. For some, shopping is a form of therapy—a way to lift their mood or celebrate an achievement. This phenomenon, often referred to as retail therapy, is supported by studies that show shopping can reduce stress and increase happiness, even if the effects are temporary.\n Shopping can also be a way to express individuality. The clothes we wear, the gadgets we buy, and the brands we choose all contribute to our identity. Through shopping, we curate a personal style and communicate who we are to the world.",
  //     image: "/image6.svg",
  //   },
  //   {
  //     id: 3,
  //     title: "The Social Aspect",
  //     description:
  //       "Shopping is often a social activity. Whether we’re shopping with friends, discussing purchases with family, or sharing our latest finds on social media, shopping connects us with others. It’s common to bond over shared tastes, give and receive shopping advice, or even gift items that we think others will love.\n Shopping events like Black Friday or holiday sales have become social phenomena, where people come together—either in-store or online—to hunt for bargains and share the excitement of scoring a great deal.",
  //     image: "/image12.svg",
  //   },

  //   {
  //     id: 4,
  //     title: "The Impact of Technology",
  //     description:
  //       "Technology has transformed the way we shop. The convenience of online shopping, the availability of customer reviews, and the ability to compare prices with just a few clicks have empowered consumers like never before. Mobile apps, social media platforms, and e-commerce websites offer personalized recommendations, making the shopping experience more tailored to individual preferences.\n Moreover, innovations like augmented reality (AR) and virtual reality (VR) are beginning to bridge the gap between online and offline shopping, allowing consumers to try products virtually before buying. This blend of technology and shopping has opened up new possibilities for both consumers and retailers.",
  //     image: "/image10.svg",
  //   },
  //   {
  //     id: 5,
  //     title: "Conscious Consumerism",
  //     description:
  //       "As much as shopping is enjoyable, it’s also important to be mindful of our choices. The rise of conscious consumerism has led more people to consider the environmental and ethical implications of their purchases. Whether it’s choosing sustainable brands, supporting local businesses, or reducing waste by buying only what we need, shopping can be aligned with our values.\n Many shoppers today are more aware of the impact their purchases have on the planet and are seeking out eco-friendly and ethical products. This shift towards responsible shopping is not only beneficial for the environment but also contributes to a sense of satisfaction and purpose.",
  //     image: "/image11.svg",
  //   },
  //   {
  //     id: 7,
  //     title: "Conscious Consumerism",
  //     description:
  //       "Shopping can also be a way to express individuality. The clothes we wear, the gadgets we buy, and the brands we choose all contribute to our identity. Through shopping, we curate a personal style and communicate who we are to the world. Beyond the tangible products we buy, shopping has psychological benefits. For some, shopping is a form of therapy—a way to lift their mood or celebrate an achievement. This phenomenon, often referred to as retail therapy, is supported by studies that show shopping can reduce stress and increase happiness, even if the effects are temporary.",
  //     image: "/image14.svg",
  //   },
  // ]);
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
