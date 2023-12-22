import React from "react";

export default function PostFooter() {
    return(
        <div className="container z-10 w-full bg-orange-500 flex flex-row space-y-4 justify-center content-center justify-items-center">
            <div className="ml-3 place-self-center text-white flex flex-row">
                <p className="mr-2">Made with </p>
                <p className="App-footer bg-red mt-2"></p> 
                <p className="ml-2">by Sayantan</p>
            </div>
        </div>
    )
}