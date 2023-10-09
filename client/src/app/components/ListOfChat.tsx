import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { User, UserDetail } from "../models/User";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { addListChat, loadListChat } from "../../pages/chat/ChatSlice";
import { Message } from "../models/Chat";
import { formatChatTime } from "../utils/formatChatTime";

interface Props {
  userLoginDetail: UserDetail;
  userLogin: User;
}
export default function ListOfChat({ userLogin, userLoginDetail }: Props) {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chat.listChat);

  //Connect hub
  const [connection, setConnection] = useState<any>(null);

  useEffect(() => {
    if (userLoginDetail && userLogin) {
      const connection = new HubConnectionBuilder()
        .withUrl(
          `https://motormate.azurewebsites.net/messages?userId=${userLoginDetail?.id}&pageNumber=1&pageSize=10`,
          {
            accessTokenFactory: () => `${userLogin?.token}`,
          }
        )
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      connection
        .start()
        .then(() => {
          console.log("Connected");
          connection.on("ReceiveChat", (message: Message) => {
            dispatch(addListChat(message));
          });

          connection.on("LoadChats", (chats: any[]) => {
            dispatch(loadListChat(chats));
          });

          // connection.invoke("OnConnectedAsync");
          setConnection(connection);
        })
        .catch((error) =>
          console.log("Error while establishing connection: " + error)
        );

      return () => {
        connection
          .stop()
          .catch((error) =>
            console.log("Error while stopping connection: " + error)
          );
      };
    }
  }, [dispatch, userLoginDetail]);

  // Handle start new chat form
  const handleStartNewChat = () => {};
  return (
    <>
      <div className="flex justify-between gap-1 border-b-2 py-2 px-1 h-11 sticky top-0 bg-white">
        <input
          type="text"
          placeholder="Search"
          className="py-1 px-1 border-2 border-gray-200 rounded-xl w-full text-center h-full text-xs"
        />
        <div
          className="flex items-center justify-center w-fit h-fit  bg-gray-200 pt-2 pb-1 px-[6px] rounded-full cursor-pointer hover:bg-gray-300"
          onClick={handleStartNewChat}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24.00 24.00"
            xmlns="http://www.w3.org/2000/svg"
            mirror-in-rtl="true"
            fill="#000000"
            stroke="#000000"
            strokeWidth="0.00024000000000000003"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="1.344"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                fillRule="evenodd"
                d="M24 3v4a1 1 0 0 1-2 0V3a1 1 0 0 0-.9-.99c-.05 0-.08-.01-.11-.01H3a1.016 1.016 0 0 0-1 1v10a1.016 1.016 0 0 0 1 1h2v2.81l2.69-2.32.57-.49H15a1 1 0 0 1 0 2H9l-4.35 3.76A.969.969 0 0 1 4 20a1.059 1.059 0 0 1-.42-.09A1 1 0 0 1 3 19v-3a3.009 3.009 0 0 1-3-3V3a3.009 3.009 0 0 1 3-3h18a2.832 2.832 0 0 1 .3.02A3 3 0 0 1 24 3z"
              ></path>
              <path
                fill="#000000"
                fillRule="evenodd"
                d="M24 11a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 0 1 0-2h3V7a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      {/* List user send message */}
      {chats.map((chat, index) => (
        <div
          className={`flex py-2 px-1 justify-start items-center border-b-2 hover:bg-gray-200 cursor-pointer  
                
                  `}
          //   ${
          //     selectedMessage?.some(
          //       (mess) => mess.user === chat.members[0].username
          //     ) && "bg-gray-200"
          //   }

          // onClick={() => handleMessageClick(message)}
          key={index}
        >
          <div className="w-8 mr-1">
            <img
              src={
                chat.members.find(
                  (member) => member.username !== userLoginDetail?.userName
                )?.avatar || ""
              }
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-start">
              <div className="flex-1 text-sm font-semibold line-clamp-1">
                {chat.members.find(
                  (member) => member.username !== userLoginDetail?.userName
                )?.username || ""}
              </div>
            </div>
            <div className="flex justify-start items-center">
              <span className="flex-1 text-gray-500 text-[10px] font-medium line-clamp-1">
                Lastest message aaaaaaaaaaaaaa dawdawd
              </span>
              <div className="w-fit text-right text-[8px] font-bold justify-end text-gray-500">
                {formatChatTime(chat.lastUpdatedAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* End of list user send message */}
    </>
  );
}
