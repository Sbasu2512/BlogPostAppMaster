import React from "react"

const LoginForm = () => {
    return (
        <>
        <form className="flex flex-col mt-4 ">
          <span>
            <input
              type="email"
              name="email"
              className="border-2 border-gray-300 px-1 w-3/5"
              placeholder="email"
            />
          </span>
          <span className="mt-3">
            <input
              type="password"
              name="password"
              className="border-2 border-gray-300 px-1 w-3/5"
              placeholder="password"
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