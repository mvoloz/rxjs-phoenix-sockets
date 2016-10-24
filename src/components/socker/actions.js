

export const createSocket = (room) => ({ type: 'JOIN_ROOM', payload: room })

export const pushMessage = (payload) => ({type: 'SEND_MESSAGE', payload})
