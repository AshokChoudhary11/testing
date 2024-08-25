import BlogForm from "../../components/BlogForm";

const NewPostPage = () => {
  return (
    <div>
      <main style={styles.main}>
        <BlogForm />
      </main>
    </div>
  );
};

const styles = {
  main: {
    padding: "1rem",
  },
};

export default NewPostPage;
