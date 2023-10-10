import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { Chat, Message } from "../../app/models/Chat";
import {
  addListChat,
  addListMessage,
  loadListChat,
  loadListMessage,
  setMetaDataMessage,
  setPageNumber,
} from "./ChatSlice";
import SelectUserChat from "../../app/components/SelectUserChat";
import {
  formatChatTime,
  formatChatTimeOnHover,
} from "../../app/utils/formatChatTime";
import LoaderButton from "../../app/components/LoaderButton";
import { MetaData } from "../../app/models/Pagination";

export default function TinyChat() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormClosing, setIsFormClosing] = useState(false);

  const [newChatForm, setNewChatForm] = useState(true);
  const [userNewChat, setUserNewChat] = useState<string | null>(null);
  const [messageSend, setMessageSend] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [listMessageLoaded, setListMessageLoaded] = useState<boolean>(false);
  const [listChatLoaded, setListChatLoaded] = useState<boolean>(true);
  const [isFetchPreviousMess, setIsFetchPreviousMess] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { listChat, listMessage, metaData } = useAppSelector(
    (state) => state.chat
  );

  const listUserMessage = listMessage.filter((m) => m.chatId === selectedChat);
  const metaDataMessage = metaData?.find((m) => m.chatId === selectedChat);

  const userLogin = useAppSelector((state) => state.account.user);
  const userLoginDetail = useAppSelector((state) => state.account.userDetail);

  //Connect hub
  const [connectionMessagesHub, setConnectionMessagesHub] = useState<any>(null);
  const [connectionChatDetailHub, setConnectionChatDetailHub] =
    useState<any>(null);

  // Connect to ChatHub
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
          connection.on("ReceiveChat", (message: Chat) => {
            const result = dispatch(addListChat(message));
            setSelectedChat(result.payload.id);
          });

          connection.on("LoadChats", (chats: Chat[], pagination: MetaData) => {
            dispatch(loadListChat(chats));
            setListChatLoaded(false);
          });
          setConnectionMessagesHub(connection);
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

  //Connect to Messagehub
  useEffect(() => {
    if (userLoginDetail && userLogin && selectedChat) {
      // const { currentPage, pageSize } = metaDataMessage?.metaData!;
      let pageNumber = 1;
      let pageSize = 10;
      if (metaDataMessage) {
        pageNumber = metaDataMessage.metaData.currentPage;
        pageSize = metaDataMessage.metaData.pageSize;
      }
      const connection = new HubConnectionBuilder()
        .withUrl(
          `https://motormate.azurewebsites.net/chat-details?chatId=${selectedChat}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
          console.log("Connected to messageHub");
          connection.on("ReceiveMessage", (message: Message) => {
            dispatch(addListMessage(message));
          });

          connection.on(
            "LoadMessages",
            (chats: Message[], pagination: MetaData) => {
              const metaData = {
                chatId: chats[0].chatId,
                metaData: pagination,
              };
              dispatch(setMetaDataMessage(metaData));
              dispatch(loadListMessage(chats));
              setIsFetchPreviousMess(false);
              setListMessageLoaded(false);
            }
          );
          setConnectionChatDetailHub(connection);
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
  }, [
    dispatch,
    userLoginDetail,
    selectedChat,
    metaDataMessage?.metaData.currentPage,
  ]);

  const handleSubmitSendMessage = async (event: any) => {
    try {
      if (messageSend && !checkOnlySpaces(messageSend)) {
        event.preventDefault();
        const request = {
          message: messageSend,
          senderId: userLoginDetail?.id,
        };

        await connectionChatDetailHub.invoke("CreateMessageAsync", request);
        setMessageSend("");
        await connectionMessagesHub.invoke("OnConnectedAsync");
      }
    } catch (error) {
      console.log("Error when send mess: ", error);
    }
  };

  const handleSubmitCreateChat = async (event: any) => {
    try {
      if (messageSend) {
        event.preventDefault();
        const request = {
          members: [userLoginDetail?.userName, userNewChat],
          chatMessage: {
            userName: userLoginDetail?.userName,
            message: messageSend,
          },
        };

        await connectionMessagesHub.invoke("CreateChatAsync", request);
        setMessageSend("");
      }
    } catch (error) {
      console.log("Error when create new chat", error);
    }
  };

  //End of connect hub
  const handleIconClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseClick = () => {
    setIsFormClosing(true);
    setIsFormVisible(false);
    setIsFormClosing(false);
  };

  function checkOnlySpaces(str: string): boolean {
    return /^\s*$/.test(str);
  }

  const handleChatClick = (chatId: string) => {
    setNewChatForm(false);
    setListMessageLoaded(true);
    // dispatch(resetListMessage());
    setSelectedChat(chatId);
  };
  //End of test data message
  // Scroll to the bottom when open chat
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const scrollToBottom = (): void => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // End of scroll to the bottom when open chat

  // Scroll on top to fetch previous message
  const handleScroll = (): void => {
    if (chatContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        chatContainerRef.current;
      const hasScrollbar = scrollHeight > clientHeight;

      if (hasScrollbar && scrollTop === 0) {
        fetchPreviousMessages();
      }
    }
  };

  const fetchPreviousMessages = (): void => {
    if (listMessage) {
      debugger;
      if (
        metaDataMessage &&
        metaDataMessage.metaData.totalPageCount >
          metaDataMessage.metaData.currentPage
      ) {
        setIsFetchPreviousMess(true);
        const pagination = {
          chatId: selectedChat,
          pageNumber: metaDataMessage?.metaData.currentPage + 1,
        };
        dispatch(setPageNumber(pagination));
      }
    }
  };
  // End of scroll on top to fetch previous message

  // Hover to see time message
  let hoverTimer: ReturnType<typeof setTimeout>;

  function startHoverTimer(idDiv: string) {
    hoverTimer = setTimeout(() => showTimeMessage(idDiv), 500);
  }

  function resetHoverTimer(idDiv: string) {
    clearTimeout(hoverTimer);
    hideTimeMessage(idDiv);
  }

  function showTimeMessage(idDiv: string): void {
    const hiddenDiv = document.getElementById(idDiv) as HTMLElement;
    hiddenDiv.classList.remove("hidden");
  }

  function hideTimeMessage(idDiv: string): void {
    const hiddenDiv = document.getElementById(idDiv) as HTMLElement;
    hiddenDiv.classList.add("hidden");
  }
  // End of hover to see time message

  // Handle start new chat form
  const handleStartNewChat = () => {
    setNewChatForm(true);
    setSelectedChat(null);
    setListMessageLoaded(true);
  };

  return (
    <>
      {!isFormVisible && (
        <div className="fixed bottom-0 right-0 p-5 z-50">
          <button className="chatBtn" onClick={handleIconClick}>
            <svg
              height="1.6em"
              fill="white"
              viewBox="0 0 1000 1000"
              y="0px"
              x="0px"
              version="1.1"
            >
              <path d="M881.1,720.5H434.7L173.3,941V720.5h-54.4C58.8,720.5,10,671.1,10,610.2v-441C10,108.4,58.8,59,118.9,59h762.2C941.2,59,990,108.4,990,169.3v441C990,671.1,941.2,720.5,881.1,720.5L881.1,720.5z M935.6,169.3c0-30.4-24.4-55.2-54.5-55.2H118.9c-30.1,0-54.5,24.7-54.5,55.2v441c0,30.4,24.4,55.1,54.5,55.1h54.4h54.4v110.3l163.3-110.2H500h381.1c30.1,0,54.5-24.7,54.5-55.1V169.3L935.6,169.3z M717.8,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.5,24.7,54.5,55.2C772.2,420.2,747.8,444.8,717.8,444.8L717.8,444.8z M500,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.4,24.7,54.4,55.2C554.4,420.2,530.1,444.8,500,444.8L500,444.8z M282.2,444.8c-30.1,0-54.5-24.7-54.5-55.1c0-30.4,24.4-55.2,54.5-55.2c30.1,0,54.4,24.7,54.4,55.2C336.7,420.2,312.3,444.8,282.2,444.8L282.2,444.8z"></path>
            </svg>
            <span className="tooltip">Chat</span>
            <span className="absolute top-0 -right-[2px] z-1 h-[10px] w-[10px] rounded-full bg-red-500 flex items-center justify-center">
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            </span>
          </button>
        </div>
      )}

      {isFormVisible && (
        <div
          className={`container md:min-w-[400px] overflow-auto mx-auto rounded-lg border-2 md:w-1/3 md:max-h-96 md:max-w-lg fixed bottom-0 right-0 z-50 bg-white py-1
        ${isFormClosing ? "animate-fade-out" : "animate-fade-in"}
          `}
        >
          <div
            className="flex  justify-between items-center bg-white border-b-2"
            style={{ fontSize: "0.8rem" }}
          >
            <div className="text-center min-w-[150px]" style={{ width: "40%" }}>
              <p className="font-semibold text-xl ml-2">Chat</p>
            </div>
            <div
              className="flex justify-between items-center min-w-[220px]  bg-gradient-to-r from-[#ffa703] to-[#FF7E06] p-2 h-full rounded-l-sm rounded-lg -mt-1 "
              style={{ width: "61%" }}
            >
              <div className="flex flex-initial items-center">
                {selectedChat && (
                  <>
                    <div className="h-8 w-8 border shadow-md rounded-full">
                      <img
                        className="h-full w-full rounded-full text-white font-semibold flex items-center justify-center"
                        src={
                          listChat
                            .find((chat) => chat.id === selectedChat)
                            ?.members.find(
                              (member) =>
                                member.username !== userLoginDetail?.userName
                            )?.avatar || ""
                        }
                      />
                    </div>

                    <p className="flex-initial ml-2 text-white line-clamp-1 overflow-ellipsis break-all">
                      {listChat
                        .find((chat) => chat.id === selectedChat)
                        ?.members.find(
                          (member) =>
                            member.username !== userLoginDetail?.userName
                        )?.username || ""}
                    </p>
                  </>
                )}
              </div>
              <div className="flex-row flex-initial items-center justify-center">
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="bg-white rounded-md flex text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between bg-white max-h-80">
            {/* List of chat */}
            <div className="flex flex-col min-w-[150px] w-[40%] border-r-2  max-h-80 overflow-y-autoscrollbar ">
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
              {listChatLoaded && <LoaderButton />}
              {listChat.map((chat, index) => (
                <div
                  className={`flex py-2 px-1 justify-start items-center border-b-2 hover:bg-gray-200 cursor-pointer  
                  ${selectedChat === chat.id && "bg-gray-200"}
                  `}
                  onClick={() => handleChatClick(chat.id)}
                  key={index}
                >
                  <div className="w-8 h-8 mr-1">
                    <img
                      src={
                        chat.members.find(
                          (member) =>
                            member.username !== userLoginDetail?.userName
                        )?.avatar || ""
                      }
                      className="object-cover w-full h-full rounded-full shadow-md"
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-start">
                      <div className="flex-1 text-sm font-semibold line-clamp-1 overflow-ellipsis break-all">
                        {chat.members.find(
                          (member) =>
                            member.username !== userLoginDetail?.userName
                        )?.username || ""}
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                      <span className="flex-1 text-gray-500 text-[10px] font-medium line-clamp-1 overflow-ellipsis break-all">
                        {chat.latestMessage.message}
                      </span>
                      <div className="w-fit text-right text-[8px] font-bold justify-end text-gray-500">
                        {formatChatTime(chat.latestMessage.time)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* End of list user send message */}
            </div>

            {/* Chat Details, list messages */}
            <div className="w-[60%] min-w-[220px] flex flex-col justify-between flex-grow max-h-80 ">
              <div
                className="flex flex-col px-1 h-80 overflow-y-auto scrollbar"
                ref={chatContainerRef}
                onScroll={handleScroll}
              >
                {/* Start new chat form */}
                {newChatForm && !selectedChat && (
                  <form
                    className="flex items-center justify-center"
                    onSubmit={handleSubmitCreateChat}
                  >
                    <div className="font-medium text-gray-600 text-xs w-[95%] ">
                      <SelectUserChat
                        onSelect={(username: string) =>
                          setUserNewChat(username)
                        }
                      />
                    </div>
                  </form>
                )}
                {/* End of Start new chat form */}
                {!newChatForm && listMessageLoaded && <LoaderButton />}
                {newChatForm && !selectedChat ? (
                  <>
                    <div className="flex flex-col items-center justify-center h-full w-full font-medium text-gray-600 text-xs">
                      <div>Please select a chat or start a new chat</div>
                      <div
                        className="flex items-center justify-center mt-1 w-fit h-fit bg-gray-200 pt-2 pb-1 px-[6px] rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={handleStartNewChat}
                      >
                        <svg
                          className="w-5 h-5"
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
                  </>
                ) : (
                  <>
                    {isFetchPreviousMess && <LoaderButton />}
                    {listUserMessage.map((chat) => (
                      <>
                        {/* Start detail message */}
                        {chat.user.id !== userLoginDetail?.id ? (
                          <>
                            {/* Message recieving */}
                            {/* Hover for display time of message*/}
                            <div
                              className=" flex justify-start mb-1 mr-10"
                              onMouseEnter={() =>
                                startHoverTimer("timeMessage" + chat.id)
                              }
                              onMouseLeave={() =>
                                resetHoverTimer("timeMessage" + chat.id)
                              }
                              key={chat.id}
                            >
                              <img
                                src={chat.user.avatar}
                                className="object-cover h-6 w-6 rounded-full"
                                alt="Avatar"
                              />
                              <div className="relative ml-1 py-2 px-3 bg-gray-200 rounded-br-2xl rounded-tr-2xl rounded-tl-lg text-black text-sm">
                                {chat.message}
                                <div
                                  id={"timeMessage" + chat.id}
                                  className="absolute rounded-lg px-1 py-[2px] font-normal top-1/2 transform -translate-y-1/2 -right-10 h-fit w-fit bg-gray-700 text-white opacity-75 text-sm hidden "
                                >
                                  {formatChatTime(chat.time)}
                                </div>
                              </div>
                            </div>
                            {/* End detail message */}
                          </>
                        ) : (
                          <>
                            {/* Message sending */}
                            <div
                              className="flex justify-end mb-1 ml-10"
                              onMouseEnter={() =>
                                startHoverTimer("timeMessage" + chat.id)
                              }
                              onMouseLeave={() =>
                                resetHoverTimer("timeMessage" + chat.id)
                              }
                              key={chat.id}
                            >
                              <div className="relative mr-1 py-2 px-3 bg-gradient-to-r from-[#ffa703] to-[#FF7E06] rounded-bl-2xl rounded-tl-2xl rounded-tr-lg text-white text-sm">
                                {chat.message}
                                <div
                                  id={"timeMessage" + chat.id}
                                  className="absolute rounded-lg px-1 py-[2px] font-normal top-1/2 transform -translate-y-1/2 -left-10 h-fit w-fit bg-gray-700 opacity-75 text-sm hidden "
                                >
                                  {formatChatTimeOnHover(chat.time)}
                                </div>
                              </div>
                              <img
                                src={chat.user.avatar}
                                className="object-cover h-6 w-6 rounded-full"
                                alt=""
                              />
                            </div>
                          </>
                        )}
                      </>
                    ))}
                  </>
                )}
              </div>
              <form
                className="flex py-2 mx-1 items-center bg-white sticky bottom-0"
                onSubmit={
                  selectedChat
                    ? handleSubmitSendMessage
                    : handleSubmitCreateChat
                }
              >
                <input
                  className="bg-white py-2 px-1 rounded-lg flex-grow text-xs"
                  style={{ width: "93%" }}
                  type="text"
                  placeholder="Type your message here..."
                  value={messageSend}
                  onChange={(message) => setMessageSend(message.target.value)}
                />
                <button className="w-6 h-6 rounded-full bg-gradient-to-r from-[#ffa703] to-[#FF7E06] flex items-center justify-center ml-1">
                  <svg
                    className="w-3 h-3 rotate-45 text-white ml-[2px] mb-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                    style={{ width: "12px", height: "12px" }}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
