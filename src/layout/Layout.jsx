import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh_-_76px)]">
        <div className="container mx-auto pt-6">{children}</div>
      </div>
    </>
  );
};

export default Layout;
