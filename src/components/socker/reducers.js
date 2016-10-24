import RECIEVE_MESSAGE from './actionTypes';
const JOIN_ROOM = 'JOIN_ROOM';
const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR';
const SEND_MESSAGE = 'SEND_MESSAGE';

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
        response: action.payload.response
      }
    case JOIN_ROOM_ERROR:
      debugger;
      return {
        ...state,
        joinStatus: 'error'
      }

    case SEND_MESSAGE:
      return {
        ...state,
        channel: state.channel,
        newMsg: action.payload
      }
    case RECIEVE_MESSAGE:
      debugger;
      return {
        ...state,
        msg: action.payload.msg
      }
    default:
      return state;
  }
}
