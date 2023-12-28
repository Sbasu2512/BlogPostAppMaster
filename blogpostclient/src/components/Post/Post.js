import { React, useEffect } from "react";
import PostHeader from "./PostHeader/PostHeader";
import PostBody from "./PostBody/postbody";
import PostFooter from "./PostFooter/postfooter";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';


export default function Posts() {
  const allPosts = useSelector((state)=> state?.posts?.AllPosts);
  const userPosts = useSelector((state)=> state?.posts?.userPosts);
 
  let token = "";

  const location = useLocation();
  if (location?.state) {
    token = location?.state;
  }
 
  return (
    <>
    <ToastContainer />
    <div className="container">
      <PostBody token={token} allPosts={allPosts} userPosts={userPosts} />
    </div>
    </>
  );
}
