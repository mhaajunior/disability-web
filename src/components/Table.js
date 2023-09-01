import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { thousandSeparator } from "../helpers/common";

const Table = ({
  titles,
  contents,
  pageNo = 1,
  perPage = 10,
  head,
  totalRows,
  checkFn,
  pagination = false,
  onChangePage,
}) => {
  const [index, setIndex] = useState(0);
  const numArr = useRef([]);
  const num = Math.ceil(totalRows / perPage);
  const temp = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }, [num]);

  const calcSliceArr = useCallback(() => {
    if (temp.length > 5) {
      numArr.current = temp.slice(index, 5 + index);
    } else {
      numArr.current = temp;
    }
  }, [numArr, index, temp]);

  calcSliceArr();

  useEffect(() => {
    calcSliceArr();
  }, [calcSliceArr]);

  const renderedPage = () => {
    return numArr.current.map((num) => {
      return (
        <li key={num}>
          <span
            onClick={() => handleClickPage(num)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
              num === pageNo
                ? "!bg-gray-100 text-gray-700"
                : "cursor-pointer hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {num}
          </span>
        </li>
      );
    });
  };

  const handleClickPage = (num) => {
    if (num === pageNo) return;
    onChangePage(num);
  };

  const handlePrevious = () => {
    if (index === 0 && numArr.current[0] === 1) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (numArr.current[numArr.current.length - 1] === num) return;
    setIndex(index + 1);
  };

  return (
    <>
      <div className="md:flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">{head}</div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {titles.map((title) => {
                return (
                  <th key={title} scope="col" className="px-5 py-3">
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {contents.map((row, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.map((content, index) => {
                    return (
                      <td key={index} className="px-5 py-3">
                        {checkFn ? checkFn(content) : content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav
        className="md:flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <div>
          แสดงข้อมูลแถวที่{" "}
          {totalRows > perPage ? perPage * (pageNo - 1) + 1 : 1} -{" "}
          {totalRows > perPage ? perPage * pageNo : totalRows} จากทั้งหมด{" "}
          {thousandSeparator(totalRows)} แถว
        </div>
        {pagination && (
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <span
                onClick={handlePrevious}
                className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
                  numArr.current[0] === 1
                    ? "opacity-50"
                    : "hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                }`}
              >
                Prev
              </span>
            </li>
            {renderedPage()}
            <li>
              <span
                onClick={handleNext}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
                  numArr.current[numArr.current.length - 1] === num
                    ? "opacity-50"
                    : "hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                }`}
              >
                Next
              </span>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Table;
