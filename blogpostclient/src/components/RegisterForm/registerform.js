import React from "react";
import { useState, useEffect } from "react";

const RegisterForm = () => {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );
  const passwordRegex = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );

  // const [ email, setEmail ] = useState(null);
  // const [password, setPassword] = useState(null);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
      console.log(inputFields);
    }
  }, [errors]);

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
            placeholder="password"
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
            className="bg-green-500 p-1 w-3/5 text-white font-sans font-semibold"
            
          >
            Register
          </button>
        </span>
      </form>
    </>
  );
};

export default RegisterForm;
