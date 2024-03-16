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

const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fetchPosts, setFetchPosts] = useState(false);
  const [logUserOut, setLogUserOut] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
    return state?.users?.userDetails;
  });

  const navigate = useNavigate();
  let token;
  const location = useLocation();
  if (location?.state) {
    token = location?.state;
  }

  const checkUserEmailOrUserId = () => {
    // const userEmail = state?.email;
    // console.log(userDetails);

    // const lastLoginTime = localStorage.getItem('lastLoginTime');
    // const timeAllowed = 1000*60*4;
    // const now = new Date(Date.now()).getTime();
    // const timeSinceLastLogin = now - lastLoginTime;
    const userId = userDetails?.userId || localStorage.getItem("userId");

    if (!userId || userId === "undefined" || userId === "null") {
      setIsAuthenticated(false);
      return navigate("/");
    }
    setIsAuthenticated(true);
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
            navigate('/posts',{ state: token })
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
          axios.get(`${env.REACT_APP_Posts_API}/posts/${userDetails.userId}`),
        ])
        .then(
          axios.spread((allPosts, userPosts) => {
            //save all posts to store
            dispatch(addAllPostsAction(allPosts.data.result));
            //save user posts to store with user_id
            const userPostObj = {
              user_id: userDetails.userId,
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
    console.log(userDetails)

    const config = {
      headers:{
        'authorization':`bearer ${Cookies.get('jwt')}`
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
