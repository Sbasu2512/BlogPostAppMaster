import { React, useState } from "react";

export function EditProfileDetailsForm(props) {
  const [profileDetails, setProfileDetails] = useState({
    displayName: "",
    description: "",
  });

  const handleChange = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-row justify-between mx-2 my-2">
        <p className="font-mono">Edit profile Details</p>
        <span className="mt-1" onClick={() => props.func({editMode:false,fromData:profileDetails})}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      </div>

      <div className="font-mono mx-2">
        <input
          type="text"
          name="displayName"
          value={profileDetails.displayName}
          placeholder="Update your display Name"
          className="w-full"
          onChange={(e) => handleChange(e)}
        />
        <textarea
          rows={4}
          cols={50}
          name="description"
          value={profileDetails.description}
          placeholder="Enter about you"
          className="w-full"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </>
  );
}
