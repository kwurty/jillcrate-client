import React from 'react'

export default function JoinHostSelection({updateplayer, player, setJoin}) {
  return (
    <div className="h-32 my-5">
        <h2 className='text-white text-2xl flex items-center justify-center pb-3 font-bold py-3' >
            The Name Game
        </h2>
    <button
        className="rounded border mx-5 px-10 py-5 bg-blue-chill-500 hover:bg-blue-chill-600 hover:text-gray-200 text-white shadow-inner"
        onClick={(e) => {
            e.preventDefault();
            setJoin(false);
            updateplayer({ ...player, host: true });
        }}>

        Host Game

    </button>
    <button
        className="rounded border mx-5 px-10 py-5 bg-blue-chill-500 hover:bg-blue-chill-600 hover:text-gray-200 text-white shadow-inner"
        onClick={(e) => {
            e.preventDefault();
            setJoin(true);
        }}>

        Join Game

    </button>
</div>                        
  )
}
