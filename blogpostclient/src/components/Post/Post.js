import { React, useEffect } from "react";
import PostHeader from "./PostHeader/PostHeader";
import PostBody from "./PostBody/postbody";
import PostFooter from "./PostFooter/postfooter";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import env from "react-dotenv";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { updateUserPostsAction,updateAllPostsAction } from "../../Actions/postAction";


export default function Posts() {
  const userDetails = useSelector((state) => state?.users?.userDetails);
  const allPosts = useSelector((state)=> state?.posts?.AllPosts);
  const userPosts = useSelector((state)=> state?.posts?.userPosts);
  
  

  const [initialFetch, setInitialFetch] = useState(true)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(initialFetch){
      toast.success(`Welcome ${userDetails.displayName}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    return ()=>{setInitialFetch(false)}
  },[initialFetch]);


  let token = "";

  const [fetchPosts, setFetchPosts] = useState(false);
  const [logUserOut, setLogUserOut] = useState(false);

  const location = useLocation();
  if (location?.state) {
    token = location?.state;
  }
  //fetch user details from store
  const navigate = useNavigate();

  const refreshFeed = (data) => {
    if(data.requirement === 'fetchPosts'){
      setFetchPosts(true)
    }
    if(data.requirement === 'logout'){
      setLogUserOut(true)
    }
  }

  useEffect(()=>{
    if(fetchPosts){
     //fetching all posts and also updating the redux state
      axios.all(
        [axios.get(`${env.REACT_APP_Posts_API}/postsAll`),
        axios.get(`${env.REACT_APP_Posts_API}/posts/${userDetails.userId}`)]
      ).then((axios.spread((allPosts,userPosts)=>{
        //save all posts to store
        dispatch(updateAllPostsAction(allPosts.data.result));
        //save user posts to store with user_id
        const userPostObj = {
          user_id:userDetails.userId,
          user_posts:userPosts.data.result
        }
        dispatch(updateUserPostsAction(userPostObj));
      })))
    }

   return ()=>{
    setFetchPosts(false);
   }
  },[fetchPosts])

  useEffect(()=>{
    if(logUserOut){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
      axios.post(`${env.REACT_APP_Users_API}/logoff`,{
        user_id:userDetails.user_id,
        profile_id:userDetails.profile_id
      },{
       headers
      }).then((res)=>{
        if(res.data.message === "Logoff Successful"){
          localStorage.clear();
          navigate("/");
        }
      })
    }

    return ()=>{
      setLogUserOut(false)
    }
  },[logUserOut])


  return (
    <>
    <ToastContainer />
      <PostHeader func={refreshFeed} />
    <div className="container">
      <PostBody token={token} allPosts={allPosts} userPosts={userPosts} />
    </div>

      <PostFooter/>
    </>
  );
}
