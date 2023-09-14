import React, { useState, useEffect } from 'react';
import Login from './Login';
import Game from './Game';
import Players from './Players';
import Pregame from './Pregame';
import Howtoplay from './Howtoplay';
import { socket } from '../utilities/connect';


function App() {

  // declare game states
  const [PLAYER, SET_PLAYER] = useState({
    id: undefined,
    name: undefined,
    connected: false,
    host: undefined,
    state: 0,
  });

  const [HELP_VISIBLE, SET_HELP_VISIBLE] = useState(false);
  const [GAMESETTINGS, SET_GAMESETTINGS] = useState(undefined);
  const client = socket;

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
    client.once('returnRoomCode', (roomcode, username, gamesettings) => {
      SET_PLAYER((player) => {
        return { ...player, room: roomcode, name: username }
      });
      SET_GAMESETTINGS(gamesettings);
    });
    client.on('returnGameSettings', (gamesettings) => {
      SET_GAMESETTINGS(gamesettings);
    });
    client.on('countdown', (timeleft) => {

    });

  }, [client, PLAYER])

  // render the game based on settings
  return (
      <main className="w-screen h-screen flex justify-center self-center items-center flex-row gap-1 styledBackground">

        <Howtoplay visible={HELP_VISIBLE} setVisible={SET_HELP_VISIBLE} />
        {PLAYER.connected && PLAYER.name && GAMESETTINGS && GAMESETTINGS.STATUS === 0 && (
          <div className="pl-3 flex flex-col justify-start h-full items-center">
            {PLAYER.connected && PLAYER.name && GAMESETTINGS && GAMESETTINGS.STATUS === 0 && (
              <Pregame player={PLAYER} gamesettings={GAMESETTINGS} updategamesettings={SET_GAMESETTINGS} socket={client} />
            )}
            {PLAYER.connected && GAMESETTINGS && (
              <Players players={GAMESETTINGS.PLAYERS} />
            )
            }
            {PLAYER.connected && GAMESETTINGS && (
              <button onClick={(e) => {
                e.preventDefault();
                SET_HELP_VISIBLE(true);
              }}> How to play</button>
            )}
          </div>

        )}
{
  PLAYER.connected && !GAMESETTINGS && (
<div className="bg-blue-chill-800 max-w-lg min-w-0 border border-white border-dashed">

{/* render homescreen */}
{PLAYER.connected && !PLAYER.name && (
  <Login player={PLAYER} updateplayer={SET_PLAYER} socket={client} />
)}

{/* render host */}
{/* {PLAYER.connected && PLAYER.host && !PLAYER.name && !GAMESETTINGS && (
  <Host socket={client} player={PLAYER} updateplayer={SET_PLAYER} />
)} */}
{/* do a conditional in component maybe? */}

</div>
  )
}

{PLAYER.connected && GAMESETTINGS && (
  <div className='container align-top self-start mt-5'>
    <Game player={PLAYER} gamesettings={GAMESETTINGS} socket={client} />
  </div>
          )}
      </main>
  )
}
export default App;