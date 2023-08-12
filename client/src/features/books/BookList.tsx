import { Product } from "../../app/models/product";
import BookCard from "./BookCard";

interface Props {
  products: Product[];
}

export default function BookList({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <BookCard key={product.id} product={product} />
      ))}
    </>
  );
}
