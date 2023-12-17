import React from "react";

export default function Footer() {
    return(
        <div className="container w-full bg-orange-500 flex flex-row space-y-4 justify-center content-center justify-items-center">
            <div className="ml-3 z-10 place-self-center text-black font-sans flex flex-row">
                <p className="mr-2">Made with </p>
                <p className="App-footer bg-red mt-2"></p> 
                <p className="ml-2">by Sayantan</p>
            </div>
        </div>
    )
}