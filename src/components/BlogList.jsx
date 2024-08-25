import SingleBlog from "./singleBlog";
import "./BlogList.css";

const BlogList = ({ posts }) => {
  return (
    <div className="container">
      {posts.map((post) => (
        <SingleBlog
          id={post._id}
          title={post.title}
          description={post.description}
          images={post.image}
          date={post.date}
        />
      ))}
      {posts.length === 0 && (
        <div className="no-blogs">
          <img
            className="no-blog-image"
            src="/not-found.png"
            alt="No Blogs Found"
          />
          <h1>No Blogs Found</h1>
        </div>
      )}
    </div>
  );
};
export default BlogList;
