import { Socket } from 'phoenix';
import { Observable,  Subject } from 'rxjs';

const socket = new Socket("ws://localhost:4000/socket", {params: {user: "mike"}})
socket.connect()

/*const socketEpic = (action$, store) =>
  action$.ofType('JOIN_ROOM')
    .flatMap(action =>
    )*/
// const somethingEpic = action$ =>
//   action$.ofType(WOW)
//     .flatMap(action =>
//       something(action))
//         .catch({ xhr }) => Observable.of(
//           someAction(xhr),
//           somOtherAction(xhr)
//         ))
//     );
const joinRoom = (action) =>
  new Observable((observer) => {
    const channel = socket.channel(action.payload)
    channel.join()
      .receive('ok', response => observer.next({type: 'JOIN_ROOM_SUCCESS', payload: {channel, response}}))
      .receive('error', response => observer.next({type: 'JOIN_ROOM_ERROR', payload: {channel, response}}))
      .receive('timeout', () => observer.next({ type: 'JOIN_ROOM_ERROR', error: 'The request has timed out please try againg when you will have internet connection' }))

    console.log("ch", channel)
    return channel
  })
  .retryWhen(
    err => window.navigator.onLine ?
    Observable.timer(1000) : Observable.fromEvent(window, 'online')
  )

const observeMessage = (action) =>
  Observable.fromEvent(action.payload.channel, "msg:new")
    .map(msg => {
      debugger;
    })


const socketEpic = (action$, store) =>
  action$.ofType('JOIN_ROOM')
    .flatMap(action => {
      Observable.concat(
        debugger;
        joinRoom(action),
        observeMessage(action)
      )
      .takeUntil(
        action$.ofType('LEAVE_ROOM')
          .filter(closeAction => {
            debugger;
          })
      )
      .map(msg => msg)
    })
// const socketEpic = (action$, store) =>
//   action$.ofType('JOIN_ROOM')
//     .mergeMap(action => {
//       let obs = new Observable((observer) => {
//         const channel = socket.channel(action.payload)
//         channel.join()
//           .receive('ok', resp => observer.next({type: 'JOIN_ROOM_SUCCESS', payload: {channel, resp}}))
//           .receive('error', resp => observer.next({type: 'JOIN_ROOM_ERROR', payload: {channel, resp}}))
//
//         // channel.on("new:msg", msg => observer.next({type: 'RECIEVE_MESSAGE', payload: {channel, msg}}))
//         // return channel
//         debugger;
//         const messages = Observable.fromEvent(channel, "msg:new")
//       })
//       .retryWhen(
//         err => window.navigator.onLine ?
//         Observable.timer(1000) : Observable.fromEvent(window, 'online')
//       )
//       .takeUntil(
//         action$.ofType('LEAVE_ROOM')
//           .filter(closeAction => {
//             debugger;
//           })
//       )
//       .map(msg => msg)
//       return obs
//     })

export { socketEpic }



const sendMessageEpic = (action$, store) =>
  action$.ofType('SEND_MESSAGE')
    .mergeMap((action) => {
      let obs = new Observable((observer) => {
        const channel = action.payload.channel
        debugger;
        channel.push("new:msg", {body: action.payload.msg})
        return channel
      })
      .catch(err => { debugger;})
      .takeUntil(
        action$.ofType('LEAVE_ROOM')
          .filter(closeAction => {
            debugger;
          })
      )
      .map(msg => {
        debugger;
        })
    return obs
  })



export { sendMessageEpic }

const recieveMessageEpic = (action$, store) =>
  action$.ofType('RECIEVE_MESSAGE')
    .mergeMap(action => {
      debugger;
      return {}
    })

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
