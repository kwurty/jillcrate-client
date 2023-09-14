import React from "react";

export default function Join({
  socket,
  room,
  username,
  setUsername,
  setRoom,
  setJoin,
}) {
  const maxlength = 8;
  const joinRoom = () => {
    if (username.length > 0) {
      socket.emit("joinRoom", room, username);
    }
  };
  return (
    <div className="my-10 px-10">
      <div className="">
        <h1 className="pb-3 text-3xl text-white">Room Code:</h1>
        <div className="">
          <input
            autocomplete="off" 
            type="text"
            className="pl-2 rounded-md py-3 uppercase"
            value={room}
            onChange={(e) => setRoom(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") joinRoom();
            }}
          />
        </div>
      </div>

      <div className="">
        <h1 className="pb-3 text-3xl text-white">Name:</h1>
        <div className="">
          <input
            autocomplete="off" 
            type="text"
            id="name"
            className="pl-2 rounded-md py-3 uppercase"
            value={username}
            maxLength={maxlength}
            onChange={(e) => {
              const { value } = e.target;
              setUsername(value.slice(0, maxlength).toUpperCase());
            }}
            onKeyDown={(e) => {
              if (e.key === "enter") joinRoom();
            }}
          />
          <label htmlFor="name" className="text-white">
            {" "}
            ({maxlength - username.length})
          </label>
        </div>
      </div>

      <div className="">
        <button
          className="border hover:bg-blue-chill-600 hover:text-gray-200 text-white rounded-lg bg-blue-chill-500 mx-3 px-5 py-3 my-3"
          onClick={(e) => {
            e.preventDefault();
            joinRoom();
          }}
        >
          Join
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            setJoin(false);
          }}
          className="w-12 h-12 flex rounded-full items-center justify-center bg-blue-400 text-white"
        >
          {" "}
          &#8592;{" "}
        </button>
      </div>
    </div>
  );
}