/*import Rx from 'rxjs';
*/
/*import { Action } from 'rxjs';*/

import {
  PING,
  } from '../ping/actionTypes';



const pingEpic = action$ =>
  action$.ofType(PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'PONG' });

export { pingEpic }
