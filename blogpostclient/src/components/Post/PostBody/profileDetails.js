import React, { useState } from "react";

export function ProfileDetails(props) {
  //const [edit, setEdit] = useState(false);
// console.log('props',props)
  //props.func(edit);

  return (
    <>
    <div className="flex flex-row justify-between mx-2 my-2">
      <p className="font-mono ">Profile Details</p>
      <span className="mt-1" onClick={() => props.func({editMode:true, showProfileForm:false})}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
        </svg>
      </span>
            </div>
      <div className="font-mono ml-2">
        <p>Display Name: {props?.userDetails?.displayName} </p>
        <p>Description: {props?.userDetails?.description} </p>
      </div>
    </>
  );
}
