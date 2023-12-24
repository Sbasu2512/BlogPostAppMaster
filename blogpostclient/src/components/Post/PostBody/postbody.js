import React, { useEffect, useState, Fragment } from "react";
import { EditProfileDetailsForm } from "./editProfileForm";
import { ProfileDetails } from "./profileDetails";
import axios from "axios";
import env from "react-dotenv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../Card/card";
import { updateUserDetailsAction } from "../../../Actions/userAction";
import { ToastContainer, toast } from 'react-toastify';

export default function PostBody(props) {
  const userDetailsObj = useSelector((state) => state?.users?.userDetails);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(true);

  const [profileDetails, setProfileDetails] = useState({
    displayName: userDetailsObj?.displayName ? userDetailsObj.displayName : "",
    descripton: userDetailsObj?.description ? userDetailsObj.description : "",
  });

  const [updatePasswordForm, setUpdatePasswordForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const toggleEdit = (data) => {
    setShowProfileForm(data.showProfileForm)
    if (data.editMode === false) {
      setProfileDetails({
        displayName: data?.fromData?.displayName,
        descripton: data?.fromData?.description,
      });
      setEdit(true);
      setShowProfileForm(true)
    }
  };
  const navigate = useNavigate();
  

  // console.log(userDetails);

  const handleUpdatePasswordFormChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setUpdatePasswordForm({
      ...updatePasswordForm,
      [e.target.name]: e.target.value,
    });

    console.log('pass', updatePasswordForm.newPassword)
  };

  const resetUpdatePasswordForm = (e) => {
    e.preventDefault();
    setUpdatePasswordForm({
      oldPassword:"",
      newPassword:"",
      confirmNewPassword:""
    });
  };

  useEffect(()=>{
    if(profileDetails && profileDetails.descripton !== "" && profileDetails.displayName !== "" && edit){
       const userId = userDetailsObj.userId;
       const profileId = userDetailsObj.profileId;
       const headers={
        'authorization':`Bearer ${props.token}`
       }
        axios.post(`${env.REACT_APP_Users_API}/updateProfile`,{
          user_id:userId,
          profile_id:profileId,
          displayName:profileDetails.displayName,
          description:profileDetails.descripton
        },{headers}).then((res)=>{
          console.log('res',res);
          if(res.data.message === 'Profile Updated Successfully'){
            setProfileDetails({
              displayName:res.data.result.displayname,
              descripton: res.data.result.description
            });
           
            dispatch(updateUserDetailsAction({
              userId: userDetailsObj.userId,
              displayName: res.data.result.displayname,
              description: res.data.result.description
            }))
            
            toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
          } else{
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
        })
      }
      
      return ()=>{
        setEdit(false);
      }
    },[profileDetails])
    
    
  const createNewPost = () => {
    setTimeout(() => {
      navigate("/createNewPost", { state: props.token });
    }, 500);
  };

  const title = `What is Lorem Ipsum?`;
  const creator = `Posted by Lorem`;
  const time = "1 hour ago";
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
    <ToastContainer/>
      <div className="container grid grid-cols-5 gap-4 h-screen">
        <div className="col-span-1"></div>
        <div className="col-span-2 flex flex-col content-center flex-wrap h-screen">
          <div className="h-15 mt-3 rounded outline outline-4 outline-offset-0 outline-amber-100">
            <input
              className="w-full h-full rounded ml-2 mb-3"
              type="text"
              placeholder="Create post"
              onClick={createNewPost}
            />
          </div>
          <div>
            
          </div>
          <div className="overflow-auto min-h-[80%] max-h-[100%] h-[50%]">
          <Card title={title} creator={creator} time={time} body={body} />
          <Card title={title} creator={creator} time={time} body={body} />
          
          </div>
        </div>
        <div className="col-span-1">
          <div className="container my-3 rounded outline outline-4 outline-offset-0 outline-amber-100  min-h-[30%] max-h-[35%]">
            <div className="ml-2 p-4">
              <p className="font-mono">
                Welcome <strong> {userDetailsObj.displayName} </strong>,
                <br />
                Your personal blog post page. To create a post, click the button
                below.
              </p>
            </div>
            <div className="my-4">
              <button
                className="flex justify-center content-center justify-items-center p-2 rounded dark-orange text-white ml-16 font-mono"
                onClick={createNewPost}
              >
                Create Post
              </button>
            </div>
          </div>
          <div className="mt-2 rounded outline outline-4 outline-offset-0 outline-amber-100">
            {showProfileForm ?  (
              <ProfileDetails func={toggleEdit} userDetails={userDetailsObj} />
            ):(
              <EditProfileDetailsForm func={toggleEdit} />
            ) }
          </div>
          <div className="mt-4 rounded outline outline-4 outline-offset-0 outline-amber-100">
            <div className="flex flex-col justify-between mx-2 my-2">
              <p className="font-mono ">Account Settings</p>
              <form>
                <div className="my-2">
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
                    <span className="flex">
                      <input
                        type="password"
                        value={updatePasswordForm.newPassword}
                        onChange={(e) => handleUpdatePasswordFormChange(e)}
                        name="newPassword"
                        placeholder="Enter your new password"
                        className="border-2 border-gray-300 px-1 mt-2"
                      />
                    </span>
                  </div>
                  <div className="mt-2">
                    <button
                      className={
                            "bg-green-500	p-1 text-white font-sans font-semibold"
                      }
                    >
                      Update Password
                    </button>
                    <button className="bg-red-500	p-1 text-white font-sans font-semibold ml-2" onClick={(e)=>resetUpdatePasswordForm(e)}>
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
