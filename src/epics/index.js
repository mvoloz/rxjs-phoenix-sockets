import { combineEpics } from 'redux-observable';
import {
  /*startSocket,*/
  /*socketEpic,*/
  joinRoomEpic,
  observeMessage,
  sendMessageEpic,
  recieveMessageEpic
} from '../components/socker/socketEpic';

export const rootEpic =  combineEpics(
  /*socketEpic,*/
  joinRoomEpic,
  observeMessage,
  sendMessageEpic,
  recieveMessageEpic
)
