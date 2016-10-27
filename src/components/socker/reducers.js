// import RECEIVED_MESSAGE from './actionTypes';
// import RECEIVE_MESSAGE from './actionTypes';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const SEND_MESSAGE = 'SEND_MESSAGE';
const MESSAGE_SENT = 'MESSAGE_SENT';
const INITIAL_STATE = {}

export const socketReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case JOIN_ROOM:
      // debugger;
      return {
        ...state,
        joinStatus: 'joining'
      }
    case JOIN_ROOM_SUCCESS:
      console.log("action", action)
        // debugger;
      return {
        ...state,
        joinStatus: 'success',
        channel: action.payload.channel,
        response: action.payload.resp
      }
    case JOIN_ROOM_ERROR:
      debugger;
      return {
        ...state,
        joinStatus: 'error'
      }

    case SEND_MESSAGE:
    console.log("SENDING MESSAGE")
      return {
        ...state,
        channel: action.payload.channel,
        newMsg: action.payload.msg
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        newMsg: action.payload.body
      }
    case MESSAGE_SENT:
      debugger;
      return {
        ...state
      }
    case RECEIVED_MESSAGE:
      debugger;
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state;
  }
}
