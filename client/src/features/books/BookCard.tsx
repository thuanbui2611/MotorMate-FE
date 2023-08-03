import { Book } from "../../app/models/book";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <>
      <div className="my-1 px-1 w-auto md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 ">
        {/* <!-- Article --> */}
        <article className="overflow-hidden rounded-lg shadow-lg ">
          <a href={"/book-detail/" + book.id}>
            <img
              alt="Placeholder"
              className="block object-contain h-80 w-full rounded-t-xl"
              src={book.image}
            />
          </a>

          <header className="flex items-center justify-between leading-tight p-2 md:p-4 h-16">
            <h1 className="text-lg">
              <a
                className="no-underline hover:underline text-black line-clamp-2"
                href={"/book-detail/" + book.id}
              >
                {book.title}
              </a>
            </h1>
            <p className="text-grey-darker text-sm">14/4/19</p>
          </header>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <a
              className="flex items-center no-underline hover:underline text-black"
              href={"/book-detail/" + book.id}
            >
              {/* img size 32x32 */}
              <img
                alt="Placeholder"
                className="block rounded-full h-8 w-8"
                src={book.image}
              />
              <p className="ml-2 text-sm">{book.title.substring(0, 27)}</p>
            </a>
            <a
              className="no-underline text-grey-darker hover:text-red-dark"
              href="#"
            >
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </a>
          </footer>
        </article>
        {/* <!-- END Article --> */}
      </div>
    </>
  );
}
