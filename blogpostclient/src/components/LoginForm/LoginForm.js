import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if(inputFields && submitting){
      setSubmitting(false);
      axios.post(`${env.REACT_APP_Users_API}/login`,{
        email:inputFields.email,
        password:inputFields.password
      }).then((response)=>{        
        setInputFields({
          email: "",
          password: "",
        });
        if(response.status){
          props.func({
            status:true,
            userId:response.data.result.userId
          })
         
          localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());

          const data = {
            token:response.data.result.token,
            userId:response.data.result.userId
           } 
          //store the access token securely
          //upon successful login, we need to route the application to posts page with user profile
       setTimeout(() => {
        navigate('/posts',{state:data});
    }, 500);
        }else{
          props.func({
            status:false,
            message:response.data.message
          })
        }
      })
    }
  },[submitting]);


  const handleSubmit = (e) => {
    e.preventDefault();
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
              placeholder="Email"
              value={inputFields.email}
            onChange={(e) => handleChange(e)}
            />
          </span>
          <span className="mt-3">
            <input
              type="password"
              name="password"
              className="border-2 border-gray-300 px-1 w-3/5"
              placeholder="Password"
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