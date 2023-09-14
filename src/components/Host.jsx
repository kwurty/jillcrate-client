// eslint-disable-next-line
import React, { useState, useRef, useEffect } from "react";

export default function Host({ socket, player, updateplayer }) {
  const [username, setUsername] = useState("");
  const maxlength = 8;

  return (
    <div className="my-10 px-10">
      <div>
        <div>
          <h1 className="pb-3 text-3xl text-white">Name:</h1>
          <div className="flex flex-col align-middle justify-center">
            <div>
              <input
                autocomplete="off" 
                type="text"
                id="name"
                className="pl-2 rounded-md py-3 uppercase"
                placeholder="Enter your name"
                value={username}
                maxLength={maxlength}
                onChange={(e) => {
                  const { value } = e.target;
                  let tempUserName = value.slice(0, maxlength).toUpperCase();
                  setUsername(tempUserName);
                }}
              />
              <label htmlFor="name" className="text-white self-center pl-1">
                {" "}
                ({maxlength - username.length})
              </label>
            </div>
            <div className="flex align-middle justify-center">
              <button
                className="border hover:bg-blue-chill-600 hover:text-gray-200 text-white rounded-lg bg-blue-chill-500 mx-3 px-5 py-3 my-3"
                onClick={(e) => {
                  e.preventDefault();
                  if(!username && username.length < 1) return;
                  socket.emit("generateRoom", username);
                }}
              >
                {" "}
                Host{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
