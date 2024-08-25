const BlogDetail = ({ post }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      {post.image && (
        <img src={post.image} alt={post.title} style={styles.image} />
      )}
      <p>{post.content}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: "1rem",
  },
};

export default BlogDetail;
