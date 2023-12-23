import { React, useEffect } from "react";
import PostHeader from "./PostHeader/PostHeader";
import PostBody from "./PostBody/postbody";
import PostFooter from "./PostFooter/postfooter";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useSelector } from "react-redux";


export default function Posts() {
  const userDetails = useSelector((state) => state?.user?.userDetails);
  const allPosts = useSelector((state)=> state?.posts?.allPosts);
  const userPosts = useSelector((state)=> state?.posts?.userPosts);

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
      axios.get(`${env.REACT_APP_Posts_API}/postsAll`).then((res)=>{
        //save all posts in Post Store in redux
        console.log(res);
        console.log(token);
      })
    }

   return ()=>{
    setFetchPosts(false);
   }
  },[fetchPosts])

  useEffect(()=>{
    if(logUserOut){
      console.log('hi', logUserOut, userDetails)
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
        console.log(res);
        if(res.data.message === "Logoff Successful"){
          console.log(token);
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
      <PostHeader func={refreshFeed} />
    <div className="container">
      <PostBody token={token}/>
    </div>

      <PostFooter/>
    </>
  );
}
