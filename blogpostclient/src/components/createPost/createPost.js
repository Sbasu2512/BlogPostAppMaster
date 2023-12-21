import React, { useState } from "react";
import PostHeader from "../Post/PostHeader/PostHeader";
import PostFooter from "../Post/PostFooter/postfooter";
import { useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const userDetails = useSelector((state) => state?.userDetails);
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [inputFields, setInputFields] = useState({
    title: "",
    body: "",
    community: ""
  });

  console.log(userDetails);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
      e.preventDefault();
    setTimeout(()=>{
        navigate('/posts', {state:'token'})
    },500)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields)
    console.log('enabled', enabled);
  }

  return (
    <>
      <PostHeader />
      <div className="grid grid-cols-5 gap-4 background-bluish h-[85vh]">
        <div className="col-span-3 mx-28">
          <div className="p-2">
            <form onSubmit={handleSubmit}>
              <div >
                <h1 className="font-sans text-lg font-bold">
                Create New Post
                </h1>
              </div>
              <div className="h-15 mt-5 rounded flex flex-wrap justify-between">
                <div>
                  <select name="community" id="community" className="p-1" value={inputFields.community} onChange={(e) => handleChange(e)}>
                    <option value="select a community">
                      select a community
                    </option>
                    <option value="displayName">Display Name</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <label className="mr-2 font-mono">Save Draft:</label>
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? "bg-green-700" : "bg-red-700"}
          relative inline-flex h-[20px] w-[58px] shrink cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-9" : "translate-x-0"}
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
                  <button className="bg-red-500 p-2 w-[80px] rounded mr-2" onClick={(e)=>handleCancel(e)}>Cancel</button>
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
                    <li>
                        Remember we are all humans.
                    </li>
                    <li>
                        Be polite.
                    </li>
                    <li>
                        Behave like you would in real life.
                    </li>
                    <li>
                        Treat fellow human's with decency and respect.
                    </li>
                    <li>
                        Post should not be disrespectful towards anyone.
                    </li>
                    <li>
                        Happy Blogging!
                    </li>
                </ul>
            </div>
        </div>
        {/* <div className="col-span-1"></div> */}
      </div>
      <PostFooter />
    </>
  );
}
