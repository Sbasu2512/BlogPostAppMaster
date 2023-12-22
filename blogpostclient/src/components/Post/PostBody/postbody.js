import React, { useEffect, useState, Fragment } from "react";
import { EditProfileDetailsForm } from "./editProfileForm";
import { ProfileDetails } from "./profileDetails";
import axios from "axios";
import env from "react-dotenv";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../Card/card";

export default function PostBody(props) {
  const [edit, setEdit] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    displayName: "",
    descripton: "",
  });

  const [updatePasswordForm, setUpdatePasswordForm] = useState({
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(false);

  const toggleEdit = (data) => {
    console.log(data);
    if (data.editMode === false) {
      setProfileDetails({
        displayName: data?.fromData?.displayName,
        descripton: data?.fromData?.description,
      });
    }
    setEdit(data.editMode);
  };
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state?.userDetails);

  console.log(userDetails);

  const handleUpdatePasswordFormChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUpdatePasswordForm({
      ...updatePasswordForm,
      [e.target.name]: e.target.value,
    });
    if (
      updatePasswordForm.newPassword === updatePasswordForm.confirmNewPassword
    ) {
      setPasswordMatch(true);
    }
  };

  // useEffect(()=>{
  //   if(!edit && profileDetails){
  //       const userDetailsString = localStorage.getItem('userDetails')
  //       const userDetailsObj = JSON.parse(userDetailsString);
  //      console.log(userDetailsObj)
  //      const userId = userDetailsObj.userId;
  //      const profileId = userDetailsObj.profileId;
  //      console.log(profileDetails)
  //       // axios.post(`${env.REACT_APP_Users_API}/login`,(res)=>{

  //       // })
  //   }
  // },[profileDetails])

  //   console.log("edit", edit);

  const createNewPost = () => {
    setTimeout(() => {
      navigate("/createNewPost", { state: props.token });
    }, 500);
  };

  const title = `What is Lorem Ipsum?`;
  const creator = `Posted by Lorem`;
  const time = '1 hour ago';
  const body = `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text
  ever since the 1500s, when an unknown printer took a galley of
  type and scrambled it to make a type specimen book. It has
  survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. It was
  popularised in the 1960s with the release of Letraset sheets
  containing Lorem Ipsum passages, and more recently with desktop
  publishing software like Aldus PageMaker including versions of
  Lorem Ipsum.`;

  return (
    <>
      <div className="container grid grid-cols-5 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-2 flex flex-col content-center flex-wrap">
          <div className="h-15 mt-2 rounded outline outline-4 outline-offset-0 outline-amber-100">
            <input
              className="w-full h-full rounded ml-2 mb-3"
              type="text"
              placeholder="Create post"
              onClick={createNewPost}
            />
          </div>
          <Card title={title} creator={creator} time={time} body={body} />
         
        </div>
        <div className="col-span-1">
          <div className="my-3 rounded outline outline-4 outline-offset-0 outline-amber-100">
            <div className="ml-2 p-4">
              <p className="font-mono">
                Welcome <strong>Display Name</strong>,
                <br />
                Your personal blog post page. To create a post, click the button
                below.
              </p>
            </div>
            <div className="mb-4">
              <button
                className="flex justify-center content-center justify-items-center p-2 rounded dark-orange text-white ml-16 font-mono"
                onClick={createNewPost}
              >
                Create Post
              </button>
            </div>
          </div>
          <div className="mt-2 rounded outline outline-4 outline-offset-0 outline-amber-100">
            {edit ? (
              <EditProfileDetailsForm func={toggleEdit} />
            ) : (
              <ProfileDetails func={toggleEdit} />
            )}
          </div>
          <div className="mt-4 rounded outline outline-4 outline-offset-0 outline-amber-100">
            <div className="flex flex-col justify-between mx-2 my-2">
              <p className="font-mono ">Account Settings</p>
              <form>
                <div className="mt-2 mb-2">
                  <p>Change Password</p>
                  <div>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Enter your old password"
                      className="border-2 border-gray-300 px-1 "
                      value={updatePasswordForm.oldPassword}
                      onChange={(e) => handleUpdatePasswordFormChange(e)}
                    />
                    <input
                      type="password"
                      value={updatePasswordForm.newPassword}
                      onChange={(e) => handleUpdatePasswordFormChange(e)}
                      name="newPassword"
                      placeholder="Enter your new password"
                      className="border-2 border-gray-300 px-1 "
                    />
                    <input
                      type="password"
                      name="confirmNewPassword"
                      className="border-2 border-gray-300 px-1 "
                      placeholder="Re enter your new password"
                      value={updatePasswordForm.confirmNewPassword}
                      onChange={(e) => handleUpdatePasswordFormChange(e)}
                    />
                  </div>
                  <div className="mt-2">
                    <button
                      disabled={!passwordMatch}
                      className={
                        passwordMatch
                          ? "bg-green-500"
                          : "bg-slate-500" +
                            "	p-1 text-white font-sans font-semibold"
                      }
                    >
                      Update Password
                    </button>
                    <button className="bg-red-500	p-1 text-white font-sans font-semibold ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
