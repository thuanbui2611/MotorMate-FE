import Breadcrumb from "../app/components/Breadcrumb";
import TableOne from "../app/components/TableOne";
import TableThree from "../app/components/TableThree";
import TableTwo from "../app/components/TableTwo";

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
