import React, { useState } from "react";
import { EditProfileDetailsForm } from "./editProfileForm";
import { ProfileDetails } from "./profileDetails";

export default function PostBody() {
  const [edit, setEdit] = useState(false);
 
 const toggleEdit = (data) => {
    console.log(data);
    setEdit(data);
  }

//   console.log("edit", edit);

  return (
    <>
      <div className="container grid grid-cols-5 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-2 flex flex-col content-center flex-wrap">
          <div className="h-15 mt-2 rounded outline outline-4 outline-offset-0 outline-amber-100 ">
            <input
              className="w-full h-full rounded ml-2 mb-3"
              type="text"
              placeholder="Create post"
            />
          </div>
          <div className="h-15 rounded mt-3 light-orange font-mono">
            <span className="ml-2">What is Lorem Ipsum</span>
            <span className="float-right flex">
              <p className="mr-3">Posted by Lorem</p>
              <p className="mr-2">1 hour ago</p>
            </span>
            mr-2 <br />
            <div className="ml-2 mr-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>

          <div className="h-15 rounded mt-3 light-orange font-mono">
            <span className="ml-2">What is Lorem Ipsum</span>
            <span className="float-right flex">
              <p className="mr-3">Posted by Lorem</p>
              <p className="mr-2">1 hour ago</p>
            </span>
            mr-2 <br />
            <div className="ml-2 mr-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>

          <div className="h-15 rounded mt-3 light-orange font-mono">
            <span className="ml-2">What is Lorem Ipsum</span>
            <span className="float-right flex">
              <p className="mr-3">Posted by Lorem</p>
              <p className="mr-2">1 hour ago</p>
            </span>
            mr-2 <br />
            <div className="ml-2 mr-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="h-15 rounded mt-3 light-orange font-mono">
            <span className="ml-2">What is Lorem Ipsum</span>
            <span className="float-right flex">
              <p className="mr-3">Posted by Lorem</p>
              <p className="mr-2">1 hour ago</p>
            </span>
            mr-2 <br />
            <div className="ml-2 mr-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="mt-2 rounded outline outline-4 outline-offset-0 outline-amber-100 h-1/5">
            <div className="ml-2 p-4">
              <p className="font-mono">
                Welcome <strong>Display Name</strong>,
                <br />
                Your personal blog post page. To create a post, click the button
                below.
              </p>
            </div>
            <div>
              <button className="flex justify-center content-center justify-items-center p-2 rounded dark-orange text-white mb-4 ml-16 font-mono">
                Create Post
              </button>
            </div>
          </div>
          <div className="mt-2 rounded outline outline-4 outline-offset-0 outline-amber-100">
          {edit? (<EditProfileDetailsForm func={toggleEdit} />):(<ProfileDetails func={toggleEdit} />)}
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
