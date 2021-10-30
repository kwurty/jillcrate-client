import React, { useState, useEffect, useContext } from 'react';
import Login from './Login';
import Host from './Host';
import Game from './Game';
import Pregame from './Pregame'
import { socket, SocketContext } from '../utilities/connect';


function App() {

  // declare game states
  const [PLAYER, SET_PLAYER] = useState({
    id: undefined,
    name: undefined,
    connected: false,
    host: undefined,
    state: 0,
  })
  let [GAMESETTINGS, SET_GAMESETTINGS] = useState(undefined)
  let [PLAYERS, SET_PLAYERS] = useState()
  let [GAMESTATE, SET_GAMESTATE] = useState(null)
  const client = socket

  // const SET_GAMESETTINGS_HELPER = (new)

  // watch for game updates
  useEffect(() => {
    client.once('connect', () => {
      SET_PLAYER((player) => {
        return { ...player, id: socket.id, connected: true }
      });
    });
    client.on('disconnect', () => {
      SET_PLAYER({ ...PLAYER, connected: false })
    });
    client.once('returnRoomCode', (roomcode, gamesettings) => {
      SET_PLAYER((player) => {
        return { ...player, room: roomcode }
      });
      SET_GAMESETTINGS(gamesettings);
    });
    client.on('returnGameSettings', (gamesettings) => {
      SET_GAMESETTINGS(gamesettings);
    });
    client.on('returnJoinedRoom', (gamesettings) => {
      SET_GAMESETTINGS(gamesettings);
    })
    client.on('returnGameState', (gamestate) => {
      SET_GAMESTATE(gamestate);
    })
  }, [client])


  // render the game based on settings
  return (
    <SocketContext.Provider value={socket} >
      <div>
        {/* render homescreen */}
        {PLAYER.connected && !PLAYER.name && !PLAYER.host && (
          <Login player={PLAYER} updateplayer={SET_PLAYER} socket={client} />
        )}

        {/* render host */}
        {PLAYER.connected && !GAMESTATE && PLAYER.host && !PLAYER.name && !GAMESETTINGS && (
          <Host socket={client} player={PLAYER} updateplayer={SET_PLAYER} />
        )}

        {PLAYER.connected && !GAMESTATE && PLAYER.name && (
          <Pregame player={PLAYER} gamesettings={GAMESETTINGS} updategamesettings={SET_GAMESETTINGS} socket={client} />
        )}

        {PLAYER.connected && GAMESTATE && (
          <Game player={PLAYER} players={PLAYERS} gamesettings={GAMESETTINGS} gamestate={GAMESTATE} />
        )}

      </div>
    </SocketContext.Provider>
  )
}
export default App;