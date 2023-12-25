import { React } from "react";
import PostBody from "./PostBody/postbody";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
    <div className="container">
      <PostBody token={token} allPosts={allPosts} userPosts={userPosts} />
    </div>
    </>
  );
}
