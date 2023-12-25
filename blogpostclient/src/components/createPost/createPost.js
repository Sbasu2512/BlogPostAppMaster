import React, { useEffect, useState } from "react";
import PostHeader from "../Post/PostHeader/PostHeader";
import PostFooter from "../Post/PostFooter/postfooter";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { ToastContainer, toast } from "react-toastify";
import { updateAllPostsAction, updateUserPostsAction } from "../../Actions/postAction";

export default function CreatePost() {
  const userDetails = useSelector((state) => state?.users?.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [saveDraft, setSaveDraft] = useState(false);
  const [inputFields, setInputFields] = useState({
    title: "",
    body: "",
    tag: "",
  });
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/posts", { state: "token" });
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (
      inputFields &&
      inputFields.body !== "" &&
      inputFields.title !== "" &&
      inputFields.tag !== "" &&
      submit
    ) {
      axios
        .post(`${env.REACT_APP_Posts_API}/posts`, {
          user_id: userDetails.userId,
          title: inputFields.title,
          body: inputFields.body,
          isPublished: saveDraft,
          is_draft: saveDraft,
          tag: inputFields.tag,
          displayName: userDetails.displayName
        })
        .then((res) => {
          console.log(res);
          if(res.status === 201){
            dispatch(updateUserPostsAction(res.data.result));
            //map the res.data.result obj and add displayName of the current user
            //update the state of allPosts & user_posts
            //all posts will have  displayName an extra
            const allPostsUpdateData = {
              id:res.data.result.id,
              post_title:res.data.result.post_title,
              post_body:res.data.result.post_body,
              createdon: res.data.result.createdon,
              likescount: res.data.result.likescount,
              dislikescount: res.data.result.dislikescount,
              tag: res.data.result.tag,
              is_draft: res.data.result.is_draft,
              is_published: res.data.result.is_published,
              is_edited: res.data.result.is_edited,
              edited_on: res.data.result.edited_on,
              user_id: res.data.result.user_id,
              displayname: userDetails.displayName
            }
            dispatch(updateAllPostsAction(allPostsUpdateData));
            navigate("/posts", { state: "token" });
          } else {
            toast.error(`${res.data.message}`, {
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
        });
    }

    return () => {
      setSubmit(false);
      setSaveDraft(false);
      setInputFields({
        title: "",
        body: "",
        tag: "",
      });
    };
  }, [submit]);

  return (
    <>
    <ToastContainer/>
      <div className="grid grid-cols-5 gap-4 background-bluish h-[85vh]">
        <div className="col-span-3 mx-28">
          <div className="p-2">
            <form onSubmit={handleSubmit}>
              <div>
                <h1 className="font-sans text-lg font-bold">Create New Post</h1>
              </div>
              <div className="h-15 mt-5 rounded flex flex-wrap justify-between">
                <div>
                  <select
                    name="tag"
                    id="tag"
                    className="p-1"
                    value={inputFields.tag}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="select a Tag">select a Tag</option>
                    <option value="Opinion Piece">Opinion Piece</option>
                    <option value="Politics">Politics</option>
                    <option value="Sports">Sports</option>
                    <option value="Gossip">Gossip</option>
                    <option value="Cinema and Entertainment">
                      Cinema and Entertainment
                    </option>
                    <option value="Festival">Festival</option>
                    <option value="Law & Infrastructure">
                      Law & Infrastructure
                    </option>
                    <option value="Photography">Photography</option>
                    <option value="Transporation">Transporation</option>
                    <option value="Just For Fun">Just For Fun</option>
                    <option value="Family">Family</option>
                    <option value="Relationships">Relationships</option>
                    <option value="House Hunting">House Hunting</option>
                    <option value="Health">Health</option>
                    <option value="Services">Services</option>
                    <option value="Shopping">Shopping</option>
                    <option value="News Article">News Article</option>
                    <option value="Travel">Travel</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Art & Culture">Art & Culture</option>
                    <option value="Music">Music</option>
                    <option value="Literature">Literature</option>
                    <option value="Help">Help</option>
                    <option value="Finance">Finance</option>
                    <option value="Climate">Climate</option>
                    <option value="Science & Technology">
                      Science & Technology
                    </option>
                    <option value="History & Heritage">
                      History & Heritage
                    </option>
                    <option value="Personal Experience">
                      Personal Experience
                    </option>
                    <option value="Life & Nature">Life & Nature</option>
                    <option value="General Discussion">
                      General Discussion
                    </option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <label className="mr-2 font-mono">Save Draft:</label>
                  <Switch
                    checked={saveDraft}
                    onChange={setSaveDraft}
                    className={`${saveDraft ? "bg-green-700" : "bg-red-700"}
          relative inline-flex h-[20px] w-[58px] shrink cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        saveDraft ? "translate-x-9" : "translate-x-0"
                      }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              </div>
              <div className="mt-2">
                <div className="mb-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full p-2"
                    value={inputFields.title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="w-full">
                  <textarea
                    rows={5}
                    cols={50}
                    name="body"
                    placeholder="Write your post"
                    className="w-full p-2  h-[350px]"
                    value={inputFields.body}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="w-full mt-2">
                <span className="float-right">
                  <button
                    className="bg-red-500 p-2 w-[80px] rounded mr-2"
                    onClick={(e) => handleCancel(e)}
                  >
                    Cancel
                  </button>
                  <button className="bg-green-500 p-2 w-[80px] rounded">
                    Submit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <h1 className="font-sans text-lg font-bold">
              Rules to Posting in Blog Post App
            </h1>
          </div>
          <div className="font-mono px-3 py-2">
            <ul className="list-disc">
              <li>Remember we are all humans.</li>
              <li>Be polite.</li>
              <li>Behave like you would in real life.</li>
              <li>Treat fellow human's with decency and respect.</li>
              <li>Post should not be disrespectful towards anyone.</li>
              <li>Happy Blogging!</li>
            </ul>
          </div>
        </div>
        {/* <div className="col-span-1"></div> */}
      </div>
    </>
  );
}
