import { combineEpics } from 'redux-observable';
import {
  startSocket,
  socketEpic,
  sendMessageEpic,
  recieveMessageEpic
} from '../components/socker/socketEpic';

import { pingEpic } from './pingEpic';


export const rootEpic =  combineEpics(
  socketEpic,
  sendMessageEpic,
  recieveMessageEpic
)
