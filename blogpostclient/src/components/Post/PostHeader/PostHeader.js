import React from "react";
import { useNavigate } from "react-router-dom";


export default function PostHeader(props) {

    const logout = (e) => {
        props.func({requirement:'logout'});
      };

    const refreshFeed = (e) => {
      props.func({
        requirement:'fetchPosts'
      });
    }
    
      
    return (
        <>
          <div className="h-16 w-full bg-orange-500 flex">
           {/* home */}
            <button className="place-self-center ml-3 mr-11" onClick={(e)=>refreshFeed(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </button>

            <span className="place-self-center font-sans text-2xl font-bold text-white grow ml-3">
              <p>BlogPost App</p>
            </span>
            {/* logout */}
            <span className="place-self-center mr-3  group">
              <button onClick={(e)=>logout(e)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {/* <p className="place-self-center opacity-0 mr-3 text-white group-hover:opacity-50">
                  Logout
                </p> */}
              </button>
            </span>
          </div>
        </>
      );
}