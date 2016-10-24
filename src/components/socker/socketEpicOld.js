import { Socket } from 'phoenix';

import {
  MESSAGE,
  STOP_SOCKET,
  ERROR
} from './actionTypes';

import { Observable,  Subject} from 'rxjs';
/*import { store } from '../../lib/store';*/

const socketUrl = 'ws://localhost:4000/ws';

function startSocket(){
  return (actions, store ) => Observable.webSocket({
    url: socketUrl,
    resultSelector: msgEvent => msgEvent.data,
  })
  .map(payload => ({type: MESSAGE, payload}))
  .takeUntil(actions.ofType(STOP_SOCKET))
  .catch(err => {
    console.log('ws err', err)
    return Observable.of({type: ERROR})
  })
}

// function startSocket(){
//   console.log(socketUrl);
//   return (actions, store) => Observable.webSocket({
//     url: socketUrl,
//     resultSelector: (msgEvent) => msgEvent.data
//   })
//   .map((payload) => ({type: MESSAGE, payload: payload}))
//   .catch((err) => actions.of({type: ERROR}))
// }

/*console.log("ss", startSocket)*/
export { startSocket }


function createWebSocket() {
  const socketUrl = "//localhost:4000/socket";
  let ws = new Socket(socketUrl, {params: {user: "mike"}})

  let observable = Observable.create(
    (obs) => {
      console.log("obs", obs);
      console.log("ws1", ws);
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.onclose.bind(ws);
    }
  );

  let observer = {
    next: (data) => {
      console.log("data", data);
      console.log("wsr", ws.readyState);

      /*      if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify(data));
            }*/
    },
  };

  return Subject.create(observer, observable);
}

export { createWebSocket }

export function stopSocket(){
  return {
    type: STOP_SOCKET
  }
}
