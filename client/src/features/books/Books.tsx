import { useState, useEffect } from "react";
import { Book } from "../../app/models/book";
import BookList from "./BookList";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .finally(() => setLoading(false));
  }, []);
  const [loading, setLoading] = useState(true);
  if (loading)
    return (
      <div>
        <svg className="loader" viewBox="0 0 48 30" width="48px" height="30px">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          >
            <g transform="translate(9.5,19)">
              <circle
                className="loader_tire"
                r="9"
                stroke-dasharray="56.549 56.549"
              ></circle>
              <g
                className="loader_spokes-spin"
                stroke-dasharray="31.416 31.416"
                stroke-dashoffset="-23.562"
              >
                <circle className="loader_spokes" r="5"></circle>
                <circle
                  className="loader_spokes"
                  r="5"
                  transform="rotate(180,0,0)"
                ></circle>
              </g>
            </g>
            <g transform="translate(24,19)">
              <g
                className="loader_pedals-spin"
                stroke-dasharray="25.133 25.133"
                stroke-dashoffset="-21.991"
                transform="rotate(67.5,0,0)"
              >
                <circle className="loader_pedals" r="4"></circle>
                <circle
                  className="loader_pedals"
                  r="4"
                  transform="rotate(180,0,0)"
                ></circle>
              </g>
            </g>
            <g transform="translate(38.5,19)">
              <circle
                className="loader_tire"
                r="9"
                stroke-dasharray="56.549 56.549"
              ></circle>
              <g
                className="loader_spokes-spin"
                stroke-dasharray="31.416 31.416"
                stroke-dashoffset="-23.562"
              >
                <circle className="loader_spokes" r="5"></circle>
                <circle
                  className="loader_spokes"
                  r="5"
                  transform="rotate(180,0,0)"
                ></circle>
              </g>
            </g>
            <polyline
              className="loader_seat"
              points="14 3,18 3"
              stroke-dasharray="5 5"
            ></polyline>
            <polyline
              className="loader_body"
              points="16 3,24 19,9.5 19,18 8,34 7,24 19"
              stroke-dasharray="79 79"
            ></polyline>
            <path
              className="loader_handlebars"
              d="m30,2h6s1,0,1,1-1,1-1,1"
              stroke-dasharray="10 10"
            ></path>
            <polyline
              className="loader_front"
              points="32.5 2,38.5 19"
              stroke-dasharray="19 19"
            ></polyline>
          </g>
        </svg>
      </div>
    );
  if (!books) return <h3>Book not found</h3>;
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select your option
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Most viewed books</option>
            <option>Lastest books</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              Profile
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Dashboard
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Settings
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Invoice
            </a>
          </li>
        </ul>

        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <BookList books={books} />
        </div>
      </div>
    </>
  );
}
