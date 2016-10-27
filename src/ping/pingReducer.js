/*import PING from './actionTypes';
import PONG from './actionTypes';
*/
const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };

    case 'PONG':
      return { isPinging: false };

    default:
      return state;
  }
};

export { pingReducer };
