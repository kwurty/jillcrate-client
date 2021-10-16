import React, { useState, useEffect, useContext } from 'react';
import Login from './Login';
import Host from './Host';
import Game from './Game';
import Pregame from './Pregame'
import { socket, SocketContext } from '../utilities/connect';


function App() {

  // declare game states
  let [PLAYER, SET_PLAYER] = useState({
    id: undefined,
    name: undefined,
    connected: false,
    host: undefined,
    state: 0,
    roomcode: undefined
  })
  let [GAMESETTINGS, SET_GAMESETTINGS] = useState(undefined)
  let [PLAYERS, SET_PLAYERS] = useState()
  let [GAMESTATE, SET_GAMESTATE] = useState({
    active: false,
  })
  const client = socket

  // watch for game updates
  useEffect(() => {
    client.on('connect', () => {
      SET_PLAYER({ ...PLAYER, id: socket.id, connected: true })
    });
    client.on('disconnect', () => {
      SET_PLAYER({ ...PLAYER, connected: false })
    });
    client.on('returnRoomCode', (roomcode) => {
      // SET_PLAYER({ ...PLAYER, ishost: true, roomcode: roomcode })
    });
    client.on('returnGameSettings', (gamesettings) => {
      console.dir(JSON.parse(gamesettings));
      // SET_GAMESETTINGS(JSON.parse(gamesettings))
    });
    client.on('returnPlayerList', (players) => {

    })
  }, [])

  // render the game based on settings
  return (
    <SocketContext.Provider value={socket} >
      <div>
        {/* render homescreen */}
        {PLAYER.connected && !PLAYER.name && !PLAYER.host && (
          <Login player={PLAYER} updateplayer={SET_PLAYER} socket={client} />
        )}

        {/* render host */}
        {PLAYER.connected && !GAMESTATE.active && PLAYER.host && !PLAYER.name && (
          <Host socket={client} player={PLAYER} updateplayer={SET_PLAYER} gamesettings={GAMESETTINGS} updategamesettings={SET_GAMESETTINGS} />
        )}

        {PLAYER.connected && !GAMESTATE.active && PLAYER.name && GAMESETTINGS && (
          <Pregame player={PLAYER} players={PLAYERS} updategamesettings={SET_GAMESETTINGS} />
        )}

        {PLAYER.connected && GAMESTATE.active && (
          <Game player={PLAYER} players={PLAYERS} gamesettings={GAMESETTINGS} gamestate={GAMESTATE} />
        )}
      </div>
    </SocketContext.Provider>
  )
}
export default App;