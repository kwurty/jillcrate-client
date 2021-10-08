import React from 'react';
import Login from './Login';
import Host from './Host';
import Join from './Join';
import Disconnected from './Disconnected';
import { socket, SocketContext } from '../utilities/connect';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  function disconnect() {
    console.dir(socket)
    socket.io.disconnect();
  }

  return (
    <SocketContext.Provider value={socket} >
      <Router>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/create">
              <Host />
            </Route>
            <Route path="/join">
              <Join />
            </Route>
            <Route path="/disconnected">
              <Disconnected />
            </Route>

          </Switch>
        </div>

      </Router>
    </SocketContext.Provider>
  )
}

export default App;