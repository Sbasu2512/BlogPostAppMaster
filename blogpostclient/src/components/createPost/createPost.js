import React from "react";
import PostHeader from "../Post/PostHeader/PostHeader";
import PostFooter from "../Post/PostFooter/postfooter";

export default function CreatePost() {

    return(
        <>
        <PostHeader/>
        <div className="container h-screen flex flex-col flex-wrap">
        <div className="flex justify-center flex-wrap font-mono">
            <p>Create New Post Form</p>
        </div>
        <div className="flex justify-center flex-wrap">
            <label for="community">communitiy</label>
            <input type="text" name="communitiy" className="ml-2" />
        </div>
        </div>
        <PostFooter/>
        </>
    )
}