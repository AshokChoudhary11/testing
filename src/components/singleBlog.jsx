import React from "react";
import "./singleBlog.css";
import Link from "next/link";
const SingleBlog = ({ id, title, description, images, date }) => {
  const truncateAfterWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  const newdate = new Date(date);
  const formattedDate = newdate
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " . ");

  return (
    <Link href={`/post/${id}`} passHref className="link">
      <div className="singlepostwrapper">
        <div className="imagerwrapper">
          <img src={images} alt={title} />
        </div>
        <div className="heading">{truncateAfterWords(title, 5)}</div>
        <div className="date">{formattedDate}</div>
        <p className="discription">{truncateAfterWords(description, 20)}</p>
      </div>
    </Link>
  );
};
export default SingleBlog;
