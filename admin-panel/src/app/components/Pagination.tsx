import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MetaData } from "../models/Pagination";
import { getPagination } from "../utils/GetPagination";
import LoaderButton from "./LoaderButton";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export default function Pagination({ metaData, onPageChange, loading }: Props) {
  const [active, setActive] = useState(1);
  const { totalPageCount, currentPage } = metaData;

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "outlined",
      color: active === index ? "orange" : "gray",
      size: active === index ? "md" : "sm",
      className: "font-bold text-sm",
      onClick: () => {
        onPageChange(index);
        setActive(index);
      },
    } as any);

  const next = () => {
    if (currentPage === totalPageCount) return;
    setActive(active + 1);
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setActive(active - 1);
    onPageChange(currentPage - 1);
  };

  const maxLength = 7;
  const pageNums = getPagination(currentPage, totalPageCount, maxLength);

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 pt-2">
      <Button
        variant="text"
        className="flex items-center gap-2 hover:bg-orange-500/50 p-2"
        onClick={prev}
        disabled={active === 1 || loading}
      >
        {loading ? (
          <LoaderButton />
        ) : (
          <>
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </>
        )}
      </Button>
      <div className="flex items-center gap-2">
        {pageNums.map((pageNum, index) => (
          <IconButton key={index} {...getItemProps(pageNum)}>
            {!isNaN(pageNum) ? pageNum : "..."}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 hover:bg-orange-500/50 p-2"
        onClick={next}
        disabled={active === totalPageCount || loading}
      >
        {loading ? (
          <LoaderButton />
        ) : (
          <>
            <span>Next</span>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
