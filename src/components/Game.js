import React, { useState, useEffect } from 'react'
import { SocketContext } from '../utilities/connect'

export default function Game(game) {
    let GAME = game;
    return (
        <div className="container">
            {
                GAME.PLAYERS.map((player, index) => {
                    <div className="player" key={player.id}>
                        {player.name}
                    </div>
                })
            }

        </div>
    )
}
