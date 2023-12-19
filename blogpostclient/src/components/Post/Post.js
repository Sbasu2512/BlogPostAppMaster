import { React } from "react";
import PostHeader from "./PostHeader/PostHeader";
import PostBody from "./PostBody/postbody";
import PostFooter from "./PostFooter/postfooter";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Posts() {
  let token = "";

  const location = useLocation();
  if (location?.state) {
    token = location?.state;
  }

  const refreshFeed = () => {

  }


  return (
    <>
      <PostHeader token={token} func={refreshFeed} />

      <PostBody  token={token} />

      <PostFooter token={token} />
    </>
  );
}
