import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "features/Auth/AuthSlice";
import SettingReducer from 'features/Settings/SettingSlice';
import PlayerReducer from 'features/RentPlayer/PlayerSlice'
import MessageReducer from 'features/Settings/MessageSlice'
import ChatRoomReducer from 'features/ChatRoom/ChatRoomSlice'
import AdminReducer from 'features/Admin/AdminSlice'
import BecomePlaerReducer from 'features/BecomePlayer/BecomePlayerSlice'
import PrivateChatReducer from "features/PrivateChat/PrivateChatSlice";

const rootReducer = {
  auth: AuthReducer,
  setting: SettingReducer,
  players: PlayerReducer,
  messages: MessageReducer,
  chatRoom: ChatRoomReducer,
  admin: AdminReducer,
  services: BecomePlaerReducer,
  privateChat: PrivateChatReducer
};
export const store = configureStore({
  reducer: rootReducer
})
