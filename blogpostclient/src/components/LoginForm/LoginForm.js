import axios from "axios";
import React, { useEffect } from "react"
import { useState } from "react";
import env from "react-dotenv";

const LoginForm = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if(inputFields && submitting){
      axios.post(`${env.REACT_APP_Users_API}/login`,{
        email:inputFields.email,
        password:inputFields.password
      }).then((response)=>{
        setSubmitting(false);
        console.log('res',response);
        if(response.status === 200){
          
          props.func({
            status:true,
            message:`Login Successful`,
            data:response.data
          })
        }else{
          props.func({
            status:false,
            message:response.data
          })
        }
      })
    }
  },[submitting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    setSubmitting(true);
  }
  
  return (
        <>
        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          <span>
            <input
              type="email"
              name="email"
              className="border-2 border-gray-300 px-1 w-3/5"
              placeholder="email"
              value={inputFields.email}
            onChange={(e) => handleChange(e)}
            />
          </span>
          <span className="mt-3">
            <input
              type="password"
              name="password"
              className="border-2 border-gray-300 px-1 w-3/5"
              placeholder="password"
              value={inputFields.password}
            onChange={(e) => handleChange(e)}
            />
          </span>
          
          <span className="mt-3">
            <button className="bg-blue-500	p-1 w-3/5 text-white font-sans font-semibold">
              Login
            </button>
          </span>
        </form>
        </>
        )
}

export default LoginForm