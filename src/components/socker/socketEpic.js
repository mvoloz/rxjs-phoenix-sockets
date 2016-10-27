import { Socket } from 'phoenix';
import { Observable } from 'rxjs';

const socket = new Socket("ws://localhost:4000/socket", {params: {user: "mike"}})
socket.connect()


const socketEpic = (action$, store) =>
  action$.ofType('JOIN_ROOM')
    .mergeMap(action => {
      let obs = new Observable((observer) => {
        const channel = socket.channel(action.payload)
        channel.join()
          .receive('ok', resp => observer.next({type: 'JOIN_ROOM_SUCCESS', payload: {channel, resp}}))
          .receive('error', resp => observer.next({type: 'JOIN_ROOM_ERROR', payload: {channel, resp}}))

      })
      .retryWhen(
        err => window.navigator.onLine ?
        Observable.timer(1000) : Observable.fromEvent(window, 'online')
      )
      .takeUntil(
        action$.ofType('LEAVE_ROOM')
          .filter(closeAction => {
            debugger;
            return true
          })
      )
      .map(msg => msg)
      return obs
    })

export { socketEpic }

const joinRoomEpic = (action$, store) =>
  action$.ofType('JOIN_ROOM')
    .mergeMap(action =>
      new Observable(observer =>{
        const channel = socket.channel(action.payload)
        channel.join()
          .receive('ok', response => observer.next({type: "JOIN_ROOM_SUCCESS", payload: { channel, response}}))
          .receive('error', response => observer.next({type: "JOIN_ROOM_ERROR", payload: { channel, response}}))
      })
      .retryWhen(
        err => window.navigator.onLine ?
        Observable.timer(1000) : Observable.fromEvent(window, 'online')
      )
      .map(msg => ({type: 'JOIN_ROOM_SUCCESS', payload: msg.payload}))
    )

export { joinRoomEpic }


// const observeMessage = (action$, store) =>
//   action$.ofType('JOIN_ROOM_SUCCESS')
//     .mergeMap(action =>
//       Observable.fromEvent(action.payload.channel, 'new:msg')
//         .takeUntil(
//           action$.ofType('LEAVE_ROOM')
//             .filter(closeAction => {
//               debugger;
//               return closeAction.ticker === action.ticker
//             })
//         )
// /*        .map(msg => {
//           debugger;
//         })*/
//         .map(msg => ({type: 'RECEIVE_MESSAGE', payload: msg}))
//     )

const observeMessage = (action$, store) =>
  action$.ofType('JOIN_ROOM_SUCCESS')
    .mergeMap(action =>
      Observable.fromEvent(action.payload.channel, "new:msg")
        .filter(msg => typeof msg != 'undefined')
        .map(msg => ({type: 'RECEIVE_MESSAGE', payload: msg}))
    )
export { observeMessage }

const sendMessageEpic = (action$, store) =>
  action$.ofType('SEND_MESSAGE')
    .mergeMap(action =>
      Observable.of(action.payload.channel.push("new:msg", {body: action.payload.msg}))
        .catch(err => {
          debugger;
        })
        .map(p => ({type: 'MESSAGE_SENT', payload: p.payload}))
    )

export { sendMessageEpic }


const recieveMessageEpic = (action$, store) =>
  action$.ofType('someVar')
    .mergeMap(action =>
      Observable.of(action.payload.channel)
        // .filter(p => {debugger})
        .map(msg => {debugger; return msg})
        // .map(msg => ({type: 'RECEIVED_MESSAGE', payload: msg}))
    )

export { recieveMessageEpic }


const stockTickerEpic = (action$, store) =>
  action$.ofType('START_TICKER_STREAM')
    .mergeMap(action =>
      socket.multiplex(
        () => ({ sub: action.ticker }),
        () => ({ unsub: action.ticker }),
        msg => msg.ticker === action.ticker
      )
      .retryWhen(
        err => window.navigator.onLine ?
          Observable.timer(1000) :
          Observable.fromEvent(window, 'online')
      )
      .takeUntil(
        action$.ofType('CLOSE_TICKER_STREAM')
          .filter(closeAction => closeAction.ticker === action.ticker)
      )
      .map(tick => ({ type: 'TICKER_TICK', tick }))
    );
