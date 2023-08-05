import { Book } from "../../app/models/book";
import BookCard from "./BookCard";

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  return (
    <>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
}
