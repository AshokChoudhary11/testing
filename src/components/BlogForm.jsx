"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import "./BlogForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();
  const isThrottled = useRef(false); // Ref to track throttling state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the function is throttled
    if (isThrottled.current) return;

    // Throttle by setting the flag and resetting it after a delay
    isThrottled.current = true;
    setTimeout(() => {
      isThrottled.current = false;
    }, 1000); // 1-second delay between submissions

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/"); // Redirect to the posts page after success
        toast.success("Blog created successfully");
      } else {
        const data = await response.json();
        toast.error(data.message);
        console.error("Failed to create post", await response.json());
      }
    } catch (error) {
      console.error("An error occurred while creating the post:", error);
    } finally {
    }
  };

  return (
    <>
      <div className="formwrapper">
        <div className="heading">Create Blog</div>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label">Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea"
            />
          </div>
          <div className="formGroup">
            <label className="label">Image*</label>
            <div className="buttonwrapper">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="input"
                />
              </div>
              <button type="submit" className="button">
                Add Blog
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default BlogForm;
