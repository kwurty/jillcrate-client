import React, { useState, useEffect } from 'react'
import { SocketContext } from '../utilities/connect'

export default function Game({ gamesettings, player }) {

    if (gamesettings && gamesettings.STATUS && gamesettings.STATUS === 1) {
        return (
            <div className="container">
                GAME STATUS 1
            </div>
        )
    } else {

        return (
            <div>
                NO GAME STATUS OR NOT 1
            </div>
        )
    }
}
