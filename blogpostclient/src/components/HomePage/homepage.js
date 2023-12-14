import React from "react";

const HomePage = () => (
  <>
    <div className="grid grid-cols-2">
      <div className="col-span-1">
       
        <div className="h-screen container my-40">
          <p className="font-sans text-2xl font-bold text-red-500">
            BlogApp
          </p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="container h-screen my-10 py-10">
          <div className="w-50 h-50">
            <h1>Register</h1>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
