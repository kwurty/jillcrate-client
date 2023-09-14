import React, { useState, useEffect } from 'react'
import heart from '../images/heart.png'

export default function BoardSpot({ player, position, socket, currentplayer, setanswer }) {

    const [isWrong, setIsWrong] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        socket.on('incorrectAnswer', (currentplayer) => {
            if (currentplayer === position) {
                setIsWrong(true);
            }
        });

        socket.on('correctAnswer', (currentplayer) => {
            if (currentplayer === position) {
                setIsCorrect(true);
                setanswer("");
            }
        });
    }, [socket, position, setanswer])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWrong(false);
            setIsCorrect(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [isWrong, isCorrect])

    return (
        <div key={player.id} className={`bg-blue-chill-500 rounded-full px-4 py-4 max-w-md items-center text-white relative player${position} ${currentplayer === position ? 'border border-blue-chill-500' : ''}`}>

            <div className="block">
                <div className="text-center text-2xl overflow-clip text-ellipsis">
                    {player.name}
                </div>
                <div className="flex flex-row">
                    {player.lives > 0 && Array.from(Array(player.lives), (e, i) => {
                        if (e === 0) return ""
                        else return <img alt="life" src={heart} key={i}></img>
                    })}
                </div>
            </div>
            {/* overlays */}
            <div className={`absolute w-full h-full top-0 bottom-0 left-0 right-0 opacity-60 rounded-lg transition-all ease-out duration-75 ${isWrong ? "bg-red-500 opacity-85" : isCorrect ? "bg-green-500 opacity-85" : player.lives < 1 ? 'bg-gray-600 opacity-75' : "opacity-0"}`} id="incorrect">
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl transition-opacity ease-out duration-75 text-black opacity ${isWrong ? "visible" : "hidden"} `} id="incorrect">&#10060;</div>
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl transition-opacity ease-out duration-75 text-black ${isCorrect ? "visible" : "hidden"}`} id="correct">&#10004;</div>
            </div>
        </div>
    )
}
