import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import env from "react-dotenv";


const RegisterForm = (props) => {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );
  const passwordRegex = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );

 const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [NoErrors, setNoErrors] = useState(null);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const validateValues = (inputValues) => {
    let errors = {};
    if (!emailRegex.test(inputValues.email)) {
      errors.email = "Email is not valid";
    }
    if (!passwordRegex.test(inputValues.password)) {
      errors.password =
        "Password needs to be at least 6 characters long, must have atleast one special character and one number";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      setNoErrors(false);
      setSubmitting(false);
    }else{
        setNoErrors(true);
        setSubmitting(false)
    }
  }, [errors,inputFields]);

  useEffect(()=>{
    if(NoErrors === false)
    {
        axios.post(`${env.REACT_APP_Users_API}/register`,{
        email: inputFields.email,
        password: inputFields.password
      }).then((response)=>{
        console.log(response);
        setInputFields({
            email:'',password:''
          })
        if(response.status === 200){
            props.func({status:true,message:response.data});
        }else{
            props.func({status:false,message:response.data});
        }
      })
    }else{
        setSubmitting(false);
        setInputFields({
            email:'',password:''
          })
    }
  },[NoErrors])

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
          {errors.email ? (
            <p className="text-red-500">Email is not valid</p>
          ) : null}
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
          {errors.password ? (
            <ul className="text-red-500">
              <li>Password needs to be at least 6 characters long</li>
              <li>Password must have atleast one special character</li>
              <li>Password must have atleast one number</li>
            </ul>
          ) : null}
        </span>
        <span className="mt-3">
          <button
            className="bg-green-500 p-1 w-3/5 text-white font-sans font-semibold">
            Register
          </button>
        </span>
      </form>
    </>
  );
};

export default RegisterForm;
