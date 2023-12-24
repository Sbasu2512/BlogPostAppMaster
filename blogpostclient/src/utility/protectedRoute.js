import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader/PostHeader";
import PostFooter from "../components/Post/PostFooter/postfooter";
import { useDispatch } from "react-redux";
import axios from "axios";
import env from "react-dotenv";
import {
  updateUserPostsAction,
  updateAllPostsAction,
} from "../Actions/postAction";

const ProtectedRoute = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fetchPosts, setFetchPosts] = useState(false);
  const [logUserOut, setLogUserOut] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
    return state?.users?.userDetails;
  });

  const navigate = useNavigate();

  const checkUserEmailOrUserId = () => {
    // const userEmail = state?.email;
    // console.log(userDetails);

    // const lastLoginTime = localStorage.getItem('lastLoginTime');
    // const timeAllowed = 1000*60*4;
    // const now = new Date(Date.now()).getTime();
    // const timeSinceLastLogin = now - lastLoginTime;
    const userId = userDetails?.userId || localStorage.getItem("userId");

    if (!userId || userId === "undefined" || userId === "null") {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserEmailOrUserId();
  }, [isLoggedIn]);

  const refreshFeed = (data) => {
    if (data.requirement === "fetchPosts") {
      setFetchPosts(true);
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
            dispatch(updateAllPostsAction(allPosts.data.result));
            //save user posts to store with user_id
            const userPostObj = {
              user_id: userDetails.userId,
              user_posts: userPosts.data.result,
            };
            dispatch(updateUserPostsAction(userPostObj));
          })
        );
    }

    return () => {
      setFetchPosts(false);
    };
  }, [fetchPosts]);

  useEffect(() => {
    if (logUserOut) {
      axios
        .post(`${env.REACT_APP_Users_API}/logoff`, {
          user_id: userDetails.user_id,
          profile_id: userDetails.profile_id,
        })
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
      {isLoggedIn ? props.children : null}
      <PostFooter />
    </React.Fragment>
  );
};

export default ProtectedRoute;
