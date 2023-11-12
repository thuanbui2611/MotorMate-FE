import { Blog } from "../models/Blog";

// interface Props {
//     blogRelated: Blog;
// }
export default function BlogRelatedCard() {
  return (
    <>
      <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
        <a
          href="#_"
          className="block w-full h-full transition duration-200 ease-out transform hover:scale-110"
        >
          <img
            className="object-cover w-full shadow-sm h-full"
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
          />
        </a>
        <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
          <div className="bg-gradient-to-r from-[#FF6003] to-[#FF7E06] absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-white">
            <span>Category</span>
          </div>
          <div className="bg-gray-200 absolute top-0 right-4 -mt-3 flex items-center px-2 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-black">
            <span>12/11/2023</span>
          </div>
          <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
            <a href="#_">
              Oauth using facebook with flask,mysql,vuejs and tailwind css
            </a>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Learn how to authenticate users to your application using facebook.
          </p>
        </div>
      </div>
    </>
  );
}
