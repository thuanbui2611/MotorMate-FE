import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-8 item flex flex-col items-center justify-center gap-3">
      <h2 className="text-5xl font-semibold text-black dark:text-white">
        {pageName}
      </h2>
      <hr className="w-1/4 mt-1 border-gray-300" />

      {/* <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/">Dashboard /</Link>
          </li>
          <li className="text-primary">{pageName}</li>
        </ol>
      </nav> */}
    </div>
  );
};

export default Breadcrumb;
