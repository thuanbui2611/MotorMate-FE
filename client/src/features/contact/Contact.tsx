export default function Contact() {
  return (
    <>
      <section className="flex items-center bg-gradient-to-r from-gray-50 to-blue-50 xl:h-screen font-poppins dark:from-gray-900 dark:to-gray-900 ">
        <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-10 md:px-7">
          <div className="flex flex-wrap items-center justify-center -mx-4">
            <div className="w-full px-4 lg:w-1/2">
              <div className="max-w-sm mx-auto ">
                <div className="p-6 mb-6 text-center bg-white border rounded-md shadow dark:border-gray-800 dark:bg-gray-800">
                  <form action="">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        Please send message for futher information!{" "}
                      </h2>
                    </div>
                    <div className="flex flex-wrap mb-4 -mx-2">
                      <div className="w-full px-2 mb-4 lg:mb-0 lg:w-1/2">
                        <input
                          className="w-full px-3 py-2 leading-loose bg-gray-100 border rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                          type="text"
                          placeholder="First Name.."
                          required
                        />
                      </div>
                      <div className="w-full px-2 lg:w-1/2">
                        <input
                          className="w-full px-3 py-2 leading-loose bg-gray-100 border rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                          type="text"
                          placeholder="Last Name.."
                          required
                        />
                      </div>
                    </div>
                    <input
                      className="w-full px-3 py-2 mb-4 leading-loose bg-gray-100 border rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                      type="email"
                      placeholder="abc@gmail.com"
                      required
                    />
                    <textarea
                      rows={4}
                      placeholder="Write a message..."
                      required
                      className="block w-full px-4 mb-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-400 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-700 "
                    ></textarea>
                    <button className="w-full py-4 text-sm font-bold leading-normal text-white transition-all duration-300 bg-blue-600 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="max-w-2xl px-4 mb-16 lg:mb-0 lg:w-1/2 lg:mr-0 lg:ml-auto">
              <h2 className="mb-6 text-3xl font-bold dark:text-gray-400">
                Get In{" "}
                <span className="text-blue-600 dark:text-blue-400">Touch</span>
              </h2>
              <div className="flex mb-6 text-gray-400 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-gray-600 w-7 h-7 dark:text-gray-400 bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                </svg>
                <div className="max-w-xl ml-4 text-lg font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                  Sukedhara, Kathmandu , Nepal
                </div>
              </div>
              <div className="flex mb-6 text-gray-400 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-gray-600 w-7 h-7 bi bi-telephone dark:text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                </svg>
                <div className="max-w-xl ml-4 text-lg font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                  <span> +977-014151329 ,</span> <span> +977-014151678</span>
                </div>
              </div>
              <div className="flex text-gray-400 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-gray-600 w-7 h-7 dark:text-gray-400 bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
                </svg>
                <div className="max-w-xl ml-4 text-lg font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                  info@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
