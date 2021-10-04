import React from 'react'

export default function DisplaySettings(props) {

    return (
        <div>
            {props && props.gameSettings ? (
                <div>
                    {props.gameSettings.MAX_PLAYERS}
                </div>
            )
                :
                ''
            }

        </div>
    )
}
