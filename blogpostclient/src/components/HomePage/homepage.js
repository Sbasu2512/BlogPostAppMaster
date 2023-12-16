import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import RegisterForm from "../RegisterForm/registerform";
import LoginForm from "../LoginForm/LoginForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HomePage = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const pulldata = (data) => {
    let isSuccess = false;
    isSuccess = data.status;
    if(isSuccess){
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });        
      setSelectedIndex(1);
    }else{
      toast.error(data.message, {
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
  };


  return (<>
  <ToastContainer />
    <div className="container flex flex-col space-y-4 justify-center content-center justify-items-center	">
      <div>
        <p className="font-sans text-2xl font-bold text-red-500">BlogApp</p>
      </div>
      <div className="w-9/12 h-2/4 mx-40 ">
          <div className="w-full max-w-md px-2 py-16 sm:px-0 h-1/4 mx-96">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-30">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Register
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Login
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <RegisterForm func={pulldata} />
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <LoginForm func={pulldata} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
      </div>
    </div>
  </>)
};

export default HomePage;
