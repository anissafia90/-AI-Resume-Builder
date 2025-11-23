import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Header() {
  // Fallback header without Clerk dependency to avoid runtime errors
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link to={"/dashboard"}>
        <img
          src="/logo.png"
          className="cursor-pointer"
          width={100}
          height={100}
        />
      </Link>
      <div className="flex gap-2 items-center">
        <Link to={"/dashboard"}>
          <Button variant="outline">Dashboard</Button>
        </Link>
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
