"use client";
import Link from "next/link";
import "./Navbar.css";
import { Plus } from "react-feather";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        My Blog
      </Link>

      <Link href="/new-post" className="link">
        <div className="createpost">
          <Plus />
          Create New Post
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
