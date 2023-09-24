import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

export default function TinyChat() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormClosing, setIsFormClosing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<
    MessageDetail[] | null
  >(null);

  const handleIconClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseClick = () => {
    setIsFormClosing(true);
    setIsFormVisible(false);
    setIsFormClosing(false);
  };
  //Test data message
  type MessageList = {
    user: string;
    lastestMessage: string;
    time: string;
  };
  type MessageDetail = {
    id: string;
    user: string;
    message: string;
    time: string;
    isSender: boolean;
  };
  const messageList: MessageList[] = [
    {
      user: "James",
      lastestMessage: "Stuck with fuking bugs",
      time: "22:05",
    },

    {
      user: "Petter",
      lastestMessage: "Hi there",
      time: "23:00",
    },
  ];
  const messageDetailJames: MessageDetail[] = [
    {
      id: "a",
      user: "James",
      message: "Hello",
      time: "22:00",
      isSender: true,
    },
    {
      id: "b",
      user: "Trevor",
      message: "Hello there",
      time: "22:01",
      isSender: false,
    },
    {
      id: "c",
      user: "James",
      message: "How are you?",
      time: "22:02",
      isSender: true,
    },
    {
      id: "d",
      user: "Trevor",
      message: "Stuck with fuking bugs",
      time: "22:05",
      isSender: false,
    },
  ];
  const messageDetailPetter: MessageDetail[] = [
    {
      id: "aa",
      user: "Petter",
      message: "Hello Trevor",
      time: "22:00",
      isSender: true,
    },
    {
      id: "ab",
      user: "Trevor",
      message: "Hello pettterrrrr",
      time: "22:01",
      isSender: false,
    },
    {
      id: "ac",
      user: "Petter",
      message: "Fixing that bug yet?",
      time: "22:02",
      isSender: true,
    },
    {
      id: "ad",
      user: "Trevor",
      message: "What bugs? I don't know what you're talking about",
      time: "22:05",
      isSender: false,
    },
    {
      id: "ae",
      user: "Trevor",
      message: "It's our outstanding feature",
      time: "22:05",
      isSender: false,
    },
    {
      id: "af",
      user: "Petter",
      message: "Bruh...",
      time: "22:06",
      isSender: true,
    },
  ];
  const handleMessageClick = (message: MessageList) => {
    if (message.user === "James") {
      setSelectedMessage(messageDetailJames);
    } else if (message.user === "Petter") {
      setSelectedMessage(messageDetailPetter);
    }
  };
  //End of test data message
  // Scroll to the bottom when open chat
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedMessage]);

  const scrollToBottom = (): void => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // End of scroll to the bottom when open chat

  // Scroll on top to fetch more message
  const handleScroll = (): void => {
    if (chatContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        chatContainerRef.current;
      const hasScrollbar = scrollHeight > clientHeight;

      if (hasScrollbar && scrollTop === 0) {
        fetchMessages();
      }
    }
  };

  const fetchMessages = (): void => {
    console.log("Fetching new messages...");
  };
  // End of scroll on top to fetch more message

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
  return (
    <>
      {!isFormVisible && (
        <div className="fixed bottom-0 right-0 p-5">
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
          className={`container md:min-w-[400px] mx-auto rounded-lg border-2 md:w-1/3 md:max-h-96 md:max-w-lg fixed bottom-0 right-0 z-50 bg-white py-1
        ${isFormClosing ? "animate-fade-out" : "animate-fade-in"}
          `}
        >
          <div
            className="flex justify-between items-center bg-white border-b-2"
            style={{ fontSize: "0.8rem;" }}
          >
            <div className=" text-center" style={{ width: "40%" }}>
              <p className="font-semibold text-xl">Chat</p>
            </div>
            <div
              className="flex justify-between items-center  bg-gradient-to-r from-[#ffa703] to-[#FF7E06] p-2 h-full rounded-lg -mt-1 "
              style={{ width: "61%" }}
            >
              <div className="flex flex-initial items-center">
                {selectedMessage ? (
                  <div className="h-6 w-6 p-1 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                    J
                  </div>
                ) : (
                  ""
                )}
                <p className="flex-initial ml-2 text-white">
                  {selectedMessage ? (
                    <> {selectedMessage.find((m) => m.isSender)?.user} </>
                  ) : (
                    ""
                  )}
                </p>
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
          <div className="flex flex-row justify-between bg-white max-h-80 ">
            <div className="flex flex-col w-2/3 border-r-2  max-h-80 overflow-y-autoscrollbar ">
              <div className="border-b-2 py-2 px-1 h-11 sticky top-0 bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-1 border-2 border-gray-200 rounded-xl w-full text-center h-full text-xs"
                />
              </div>
              {/* List user send message */}
              {messageList.map((message, index) => (
                <div
                  className={`flex flex-row py-2 px-1 justify-center items-center border-b-2 hover:bg-gray-200 cursor-pointer  ${
                    selectedMessage?.some(
                      (mess) => mess.user === message.user
                    ) && "bg-gray-200"
                  }`}
                  onClick={() => handleMessageClick(message)}
                  key={index}
                >
                  <div className="w-1/4">
                    <img
                      src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="w-3/4">
                    <div className="flex justify-between">
                      <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                        {message.user}
                      </div>
                      <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                        {message.time}
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs line-clamp-1">
                      {message.lastestMessage}
                    </span>
                  </div>
                </div>
              ))}

              {/* End of list user send message */}
            </div>

            <div className="w-full flex flex-col justify-between flex-grow max-h-80 ">
              <div
                className="flex flex-col mt-2 px-1 h-80 overflow-y-auto scrollbar"
                ref={chatContainerRef}
                onScroll={handleScroll}
              >
                {!selectedMessage ? (
                  <div className="flex items-center justify-center h-full w-full font-medium text-gray-600 text-xs">
                    <div>Please select a chat or start a new chat</div>
                  </div>
                ) : (
                  <>
                    {selectedMessage.map((message) => (
                      <>
                        {/* Start detail message */}
                        {message.isSender ? (
                          <>
                            {/* Message recieving */}
                            {/* Hover for display time of message*/}
                            <div
                              className=" flex justify-start mb-1 mr-10"
                              onMouseEnter={() =>
                                startHoverTimer("timeMessage" + message.id)
                              }
                              onMouseLeave={() =>
                                resetHoverTimer("timeMessage" + message.id)
                              }
                              key={message.id}
                            >
                              <img
                                src="https://source.unsplash.com/otT2199XwI8/600x600"
                                className="object-cover h-6 w-6 rounded-full"
                                alt="Avatar"
                              />
                              <div className="relative ml-1 py-2 px-3 bg-gray-200 rounded-br-2xl rounded-tr-2xl rounded-tl-lg text-black text-sm">
                                {message.message}
                                <div
                                  id={"timeMessage" + message.id}
                                  className="absolute rounded-lg px-1 py-[2px] font-normal top-1/2 transform -translate-y-1/2 -right-10 h-fit w-fit bg-gray-700 text-white opacity-75 text-sm hidden "
                                >
                                  {message.time}
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
                                startHoverTimer("timeMessage" + message.id)
                              }
                              onMouseLeave={() =>
                                resetHoverTimer("timeMessage" + message.id)
                              }
                              key={message.id}
                            >
                              <div className="relative mr-1 py-2 px-3 bg-gradient-to-r from-[#ffa703] to-[#FF7E06] rounded-bl-2xl rounded-tl-2xl rounded-tr-lg text-white text-sm">
                                {message.message}
                                <div
                                  id={"timeMessage" + message.id}
                                  className="absolute rounded-lg px-1 py-[2px] font-normal top-1/2 transform -translate-y-1/2 -left-10 h-fit w-fit bg-gray-700 opacity-75 text-sm hidden "
                                >
                                  {message.time}
                                </div>
                              </div>
                              <img
                                src="https://source.unsplash.com/otT2199XwI8/600x600"
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
              <div className="flex py-2 mx-1 items-center bg-white sticky bottom-0">
                <input
                  className="bg-white py-2 px-1 rounded-lg flex-grow text-xs"
                  style={{ width: "93%" }}
                  type="text"
                  placeholder="Type your message here..."
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
