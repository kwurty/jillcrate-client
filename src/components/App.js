import React, { useState, useEffect } from 'react';
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
  });
  const [GAMESETTINGS, SET_GAMESETTINGS] = useState(undefined);
  const client = socket;

  let announceWinner = (winner) => {
    console.dir(GAMESETTINGS);
  }

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
    client.on('countdown', (timeleft) => {
      console.log(`Timeleft - ${timeleft} seconds`);
    })

  }, [client])

  // render the game based on settings
  return (
    <SocketContext.Provider value={socket} >
      <div className="flex">
        {/* render homescreen */}
        {PLAYER.connected && !PLAYER.name && !PLAYER.host && (
          <Login player={PLAYER} updateplayer={SET_PLAYER} socket={client} />
        )}

        {/* render host */}
        {PLAYER.connected && PLAYER.host && !PLAYER.name && !GAMESETTINGS && (
          <Host socket={client} player={PLAYER} updateplayer={SET_PLAYER} />
        )}

        {PLAYER.connected && PLAYER.name && (
          <Pregame player={PLAYER} gamesettings={GAMESETTINGS} updategamesettings={SET_GAMESETTINGS} socket={client} />
        )}

        {/* do a conditional in component maybe? */}
        {PLAYER.connected && GAMESETTINGS && (
          <Game player={PLAYER} gamesettings={GAMESETTINGS} socket={client} />
        )}

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.dir(PLAYER)
            }}>Log Player</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.dir(GAMESETTINGS)
            }}>Log Gamesettings</button>
        </div>
      </div>
    </SocketContext.Provider>
  )
}
export default App;