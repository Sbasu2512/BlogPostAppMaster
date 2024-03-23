import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate, useLocation } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader/PostHeader";
import PostFooter from "../components/Post/PostFooter/postfooter";
import { useDispatch } from "react-redux";
import axios from "axios";
import env from "react-dotenv";
import {
  addUserPostsAction,
  addAllPostsAction,
} from "../Actions/postAction";
import { addUserDetailsAction } from "../Actions/userAction";

const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fetchPosts, setFetchPosts] = useState(false);
  const [logUserOut, setLogUserOut] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
    return state?.users?.userDetails;
  });

  const navigate = useNavigate();
  let token, userId;
  const location = useLocation();
  if (location?.state ) {
    token = location?.state.token;
    userId = location.state.userId
  }
 
  const checkUserEmailOrUserId = async () => {    
    if (!userId || userId === "undefined" || userId === "null") {
      setIsAuthenticated(false);
      return navigate("/");
    }
    setIsAuthenticated(true);
    setFetchPosts(true);
  };

  useEffect(() => {
    checkUserEmailOrUserId();
  }, [isAuthenticated]);

  const refreshFeed = (data) => {
    const currentUrl = window.location.href;
    const page = currentUrl.split("/")[3]

    if (data.requirement === "fetchPosts") {
        if(page === 'posts'){
            setFetchPosts(true);
        }else{
            navigate('/posts',{ state: location.state })
        }
    }
    if (data.requirement === "logout") {
      setLogUserOut(true);
    }
  };

  useEffect(() => {
    if (fetchPosts) {
      //fetching all posts and also updating the redux state
      axios
        .all([
          axios.get(`${env.REACT_APP_Posts_API}/postsAll`),
          axios.get(`${env.REACT_APP_Posts_API}/posts/${userId}`),
        ])
        .then(
          axios.spread((allPosts, userPosts) => {
            //save all posts to store
            dispatch(addAllPostsAction(allPosts.data.result));
            //save user posts to store with user_id
            const userPostObj = {
              user_id: userId,
              user_posts: userPosts.data.result,
            };
            dispatch(addUserPostsAction(userPostObj));
          })
        );
    }

    return () => {
      setFetchPosts(false);
    };
  }, [fetchPosts]);

  useEffect(() => {
    const config = {
      headers:{
        'authorization':`bearer ${token}`
      }
    }
    if (logUserOut) {
      axios
        .post(`${env.REACT_APP_Users_API}/logoff`, {
          user_id: userDetails.userId,
          profile_id: userDetails.profileId,
        },config)
        .then((res) => {
          if (res.data.message === "Logoff Successful") {
            localStorage.clear();
            navigate("/");
          }
        });
    }

    return () => {
      setLogUserOut(false);
    };
  }, [logUserOut]);

  return (
    <React.Fragment>
      <PostHeader func={refreshFeed} />
      {isAuthenticated ? props.children : null}
      <PostFooter />
    </React.Fragment>
  );
};

export default ProtectedRoute;
