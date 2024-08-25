import { Post } from "@/db";
import multer from "multer";
import { NextResponse } from "next/server";
import { promisify } from "util";

import path from "path";
import fs from "fs";
import { Blob } from "buffer";

const ROOT_PATH = path.resolve(process.cwd() + "/public/uploads");

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    if (id) {
      // Fetch a specific post by ID
      const post = await Post.findById(id);
      if (!post) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(post, { status: 200 });
    } else {
      // Fetch all posts
      const posts = await Post.find({});
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts", error },
      { status: 500 }
    );
  }
}

// Create a new post
export async function POST(req) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = body.file || null;
    const { title, description } = body; // Extract title and content from the form data
    if (!title || !description || !file) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(ROOT_PATH)) {
      fs.mkdirSync(ROOT_PATH);
    }
    fs.writeFileSync(path.resolve(ROOT_PATH, body.file.name), buffer);

    const imagePath = `/uploads/${body.file.name}`; // Construct the image path

    // Create a new Post document
    const post = new Post({
      title,
      description,
      image: imagePath, // Store the image path in the database
    });

    // Save the new post to the database
    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    // Handle any errors that occur
    return NextResponse.json(
      { message: "Error creating post", error },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = body.file || null;

    const { id, title, description } = body; // Extract ID, title, and description from the form data
    if (!title || !description) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const post = await Post.findById(id); // Find the existing post by ID

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Update fields if provided
    if (title) post.title = title;
    if (description) post.description = description;

    // Handle image upload
    if (file) {
      // Delete the old image if a new one is uploaded
      if (post.image) {
        const buffer = Buffer.from(await file.arrayBuffer());
        if (!fs.existsSync(ROOT_PATH)) {
          fs.mkdirSync(ROOT_PATH);
        }
        fs.writeFileSync(path.resolve(ROOT_PATH, body.file.name), buffer);

        const imagePath = `/uploads/${body.file.name}`; // Construct the image path
        post.image = imagePath;
      }
    }

    // Save the updated post to the database
    await post.save();

    // Return the updated post
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Error updating post", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Validate that the ID is provided
    if (!id) {
      return NextResponse.json(
        { message: "Post ID is required." },
        { status: 400 }
      );
    }

    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting post", error },
      { status: 500 }
    );
  }
}
