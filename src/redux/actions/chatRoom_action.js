import { SET_CURRENT_CHAT_ROOM, SET_PRIVATE_CHAT_ROOM } from "./types";

export function setCurrentChatRoom(room) {
  return {
    type: SET_CURRENT_CHAT_ROOM,
    payload: room,
  };
}
export function setPrivateChatRoom(isPrivate) {
  return {
    type: SET_PRIVATE_CHAT_ROOM,
    payload: isPrivate,
  };
}
