import { Product } from "../../app/models/Product";
import { Vehicle } from "../../app/models/Vehicle";
import ProductCard from "./ProductCard";

interface Props {
  products: Vehicle[];
}

export default function ProductList({ products }: Props) {
  if (products.length === 0)
    return (
      <div className="h-20 w-full flex items-center justify-center font-bold">
        No Vehicle Found
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
