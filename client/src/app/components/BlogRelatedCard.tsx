import { Link } from "react-router-dom";
import { Blog } from "../models/Blog";
import { ConvertToDateTimeStr } from "../utils/ConvertDatetimeToStr";

interface Props {
  blogRelated: Blog;
}
export default function BlogRelatedCard({ blogRelated }: Props) {
  return (
    <>
      <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
        <Link
          to={`/blog/${blogRelated.id}`}
          className="block w-full h-full transition duration-200 ease-out transform hover:scale-110"
        >
          <img
            className="object-cover w-full shadow-sm h-full"
            src={blogRelated.image.imageUrl}
          />
        </Link>
        <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
          <div className="bg-gradient-to-r from-[#FF6003] to-[#FF7E06] absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-white">
            <span>{blogRelated.category.name}</span>
          </div>
          <div className="bg-gray-200 absolute top-0 right-4 -mt-3 flex items-center px-2 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-black">
            <span>{ConvertToDateTimeStr(blogRelated.createdAt)}</span>
          </div>
          <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
            <div className="line-clamp-3">{blogRelated.title}</div>
          </h2>
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">
            {blogRelated.content}
          </p>
        </div>
      </div>
    </>
  );
}
