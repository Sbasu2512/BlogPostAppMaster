import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();

   const state = useSelector((state)=>state?.userDetails);
   
    const checkUserEmailOrUserId = () => {
        // const userEmail = state?.email;
        // console.log(userDetails);

        // const lastLoginTime = localStorage.getItem('lastLoginTime');
        // const timeAllowed = 1000*60*4;
        // const now = new Date(Date.now()).getTime();
        // const timeSinceLastLogin = now - lastLoginTime;

        const userId = state?.userId || localStorage.getItem('userId');
        if (!userId && userId === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserEmailOrUserId();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;