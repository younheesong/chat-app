import { SET_CURRENT_CHAT_ROOM, SET_PRIVATE_CHAT_ROOM } from "../actions/types";
const initialRoomState = {
  room: null,
  isPrivate: false,
  isLoading: true,
};

export default function (state = initialRoomState, action) {
  switch (action.type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        room: action.payload,
        isLoading: false,
      };
    case SET_PRIVATE_CHAT_ROOM:
      return {
        ...state,
        isPrivate: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
