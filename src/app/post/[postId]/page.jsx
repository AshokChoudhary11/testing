"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.css";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PenTool, Trash2 } from "react-feather";

const SinglePostDetail = () => {
  const router = useRouter();
  const { postId } = useParams(); // Accessing postId from useParams hook
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    // image: null,
  });

  useEffect(() => {
    if (postId) {
      const fetchSinglePost = async () => {
        try {
          const response = await fetch(`/api/posts?_id=${postId}`); // Ensure the query parameter is `_id`
          if (!response.ok) {
            throw new Error("Failed to fetch the post");
          }
          const data = await response.json();
          if (data.message === "Post not found") {
            setPost(null);
          } else {
            setPost(data);
            setFormData({
              id: data._id || "",
              title: data.title || "",
              description: data.description || "",
              // image: data.image || null,
            });
          }
        } catch (error) {
          console.error("Error fetching post details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSinglePost();
    }
  }, [postId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("id", postId);
    updatedFormData.append("title", formData.title);
    updatedFormData.append("description", formData.description);
    if (formData.image) {
      updatedFormData.append("file", formData.image);
    }

    try {
      const response = await fetch(`/api/posts?_id=${postId}`, {
        method: "PUT",
        body: updatedFormData,
      });

      if (!response.ok) {
        toast.error("Failed to update the post");
        throw new Error("Failed to update the post");
      }

      const result = await response.json();
      toast.success("Post updated successfully");
      setPost(result);
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      const result = await response.json();
      console.log("result", result);
      toast.success(result.message);

      router.push("/"); // Redirect to the home page after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = () => {
    setShowModal(true); // Open the modal
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  } else {
    return (
      <>
        {" "}
        <div style={{ flexGrow: "1" }}>
          <div className="detailsPagewrapper">
            <div className="Imagewapper">
              {post?.image && <img src={post.image} alt={post.title} />}
            </div>
            <div className="detailswrapper">
              <h1>{post?.title}</h1>
              <div className="detail-description">
                <span
                  dangerouslySetInnerHTML={{
                    __html: post?.description?.replaceAll("\\n", "<br/><br/>"),
                  }}
                />
              </div>
              <div className="button-container">
                <button className="delete-button" onClick={handleDelete}>
                  <Trash2 />
                  Delete
                </button>
                <button className="edit-button" onClick={handleEdit}>
                  <PenTool />
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <form onSubmit={handleSave}>
                  <label>
                    Title:
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                  <label>
                    Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <div className="modal-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <ToastContainer position="bottom-right" />
      </>
    );
  }
};

export default SinglePostDetail;
